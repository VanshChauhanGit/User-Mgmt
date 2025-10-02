import { useState, useEffect } from "react";

export default function EditModal({ record, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    father: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (record) {
      setForm({
        name: record.name || "",
        email: record.email || "",
        phone: record.phone || "",
        age: record.age || "",
        father: record.father || "",
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!form.name || !form.email || !form.phone || !form.age || !form.father) {
      setError("All fields are required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return;
    }
    if (isNaN(form.age) || Number(form.age) < 0) {
      setError("Age must be a non-negative number");
      return;
    }
    if (form.phone.length !== 10 || form.phone.length > 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    setError("");
    onSave({ ...record, ...form, age: Number(form.age) });
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Record</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "age", "father"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "age" || field === "phone" ? "number" : "text"}
              value={form[field]}
              onChange={handleChange}
              placeholder={
                field === "father"
                  ? "Father's Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
