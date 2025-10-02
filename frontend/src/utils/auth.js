export const getUser = () => JSON.parse(localStorage.getItem("user"));
export const setUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const removeUser = () => localStorage.removeItem("user");

export const isAuthenticated = () => !!getUser();
