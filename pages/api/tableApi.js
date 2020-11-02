import http from "./axiosHttp";

const getAll = () => {
  return http.get("/Staff");
};
const get = id => {
  return http.get(`/Staff/${id}`);
};
const create = data => {
  return http.post("/Staff", data);
};
const update = (id, data) => {
  return http.put(`/Staff/${id}`, data);
};
const remove = id => {
  return http.delete(`/Staff/${id}`);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
};
