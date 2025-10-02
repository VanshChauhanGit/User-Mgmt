import { useEffect, useState } from "react";
import {
  getRecords,
  deleteRecord,
  deleteMultipleRecords,
  updateRecord,
  createRecord,
} from "../utils/api";
import EditModal from "../components/EditModal";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import AlertModal from "../components/AlertModal";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editRecord, setEditRecord] = useState(null);
  const [newRecord, setNewRecord] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    father: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getRecords();
      setRecords(data);
    } catch (err) {
      setError("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await deleteRecord(id);
    fetchRecords();
  };

  const handleMultiDelete = async () => {
    if (!window.confirm("Delete selected records?")) return;
    await deleteMultipleRecords(selected);
    setSelected([]);
    fetchRecords();
  };

  const handleSave = async (record) => {
    await updateRecord(record._id, record);
    setEditRecord(null);
    fetchRecords();
  };

  const handleCreate = async () => {
    // basic validation
    if (
      !newRecord.name ||
      !newRecord.email ||
      !newRecord.phone ||
      !newRecord.age ||
      !newRecord.father
    ) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newRecord.email)) {
      setError("Invalid email format");
      return;
    }
    if (isNaN(newRecord.age) || Number(newRecord.age) < 0) {
      setError("Age must be a non-negative number");
      return;
    }
    if (newRecord.phone.length !== 10 || newRecord.phone.length > 10) {
      setError("Phone number must be 10 digits");
      return;
    }
    await createRecord({ ...newRecord, age: Number(newRecord.age) });
    setNewRecord({ name: "", email: "", phone: "", age: "", father: "" });
    fetchRecords();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isAllSelected =
    records.length > 0 && selected.length === records.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelected(records.map((r) => r._id));
    else setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <AlertModal
          title="Logout"
          message="Are you sure you want to log out?"
          onOk={logout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Add New Record */}
        <div className="mb-6 p-6 bg-white shadow-xl rounded-lg space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Add New Record</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {["name", "email", "phone", "age", "father"].map((f) => (
              <input
                key={f}
                type={f === "age" || f === "phone" ? "number" : "text"}
                placeholder={
                  f === "father"
                    ? "Father's Name"
                    : f.charAt(0).toUpperCase() + f.slice(1)
                }
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newRecord[f]}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, [f]: e.target.value })
                }
              />
            ))}
            <button
              onClick={handleCreate}
              className="bg-indigo-600 w-full text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition col-span-1 md:col-span-1 selft-center"
            >
              Add
            </button>
          </div>
        </div>

        {/* Delete Selected Button */}
        {selected.length > 0 && (
          <div className="mb-4">
            <button
              onClick={handleMultiDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Delete Selected ({selected.length})
            </button>
          </div>
        )}

        {/* Records Table */}
        <div className="bg-white shadow-xl rounded-lg overflow-x-auto">
          {loading ? (
            <div className="p-8 flex justify-center">
              <Spinner />
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Father's Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {records.map((row) => (
                  <tr key={row._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selected.includes(row._id)}
                        onChange={() => toggleSelect(row._id)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.father}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setEditRecord(row)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Edit Modal */}
        {editRecord && (
          <EditModal
            record={editRecord}
            onClose={() => setEditRecord(null)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
