const API_URL = "http://localhost:3000/api";

export const getToken = () => localStorage.getItem("token");

const request = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API error");
  return data;
};

export const registerUser = (payload) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(payload) });
export const loginUser = (payload) =>
  request("/auth/login", { method: "POST", body: JSON.stringify(payload) });
export const getRecords = () => request("/records");
export const createRecord = (payload) =>
  request("/records", { method: "POST", body: JSON.stringify(payload) });
export const updateRecord = (id, payload) =>
  request(`/records/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteRecord = (id) =>
  request(`/records/${id}`, { method: "DELETE" });
export const deleteMultipleRecords = (ids) =>
  request("/records/delete-multiple", {
    method: "POST",
    body: JSON.stringify({ ids }),
  });
