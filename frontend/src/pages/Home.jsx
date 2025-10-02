import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 ">
      <section className="bg-gray-50 w-full bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto min-h-[100vh] flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Effortless User Management
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-center">
            A powerful and intuitive platform to manage your users with ease.
            Streamline registration, data handling, and more.
          </p>
          <div className="mt-10">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold py-4 px-10 rounded-full hover:from-indigo-700 hover:to-indigo-600 transition duration-300 text-lg shadow-xl hover:shadow-2xl"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-16">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
              <div className="inline-block p-5 bg-indigo-100 rounded-full mb-6">
                <UserGroupIcon className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Complete User Control
              </h3>
              <p className="text-gray-600">
                Easily add, edit, and delete user profiles. Our multi-select
                feature allows for efficient bulk operations.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
              <div className="inline-block p-5 bg-indigo-100 rounded-full mb-6">
                <SortIcon className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Advanced Data Table
              </h3>
              <p className="text-gray-600">
                Interactive data table with dynamic sorting on all columns and
                simple pagination to handle large datasets.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-3xl shadow-2xl p-10 text-center transform transition-all hover:scale-105 hover:shadow-3xl duration-300">
              <div className="inline-block p-5 bg-indigo-100 rounded-full mb-6">
                <SecureIcon className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Secure Authentication
              </h3>
              <p className="text-gray-600">
                Robust login and registration system, complete with field
                validation and Google OAuth integration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const UserGroupIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M12 14a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
);

const SortIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9M3 12h9m-9 4h13m0-4l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const SecureIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.318-5.318m0 0V3"
    />
  </svg>
);
