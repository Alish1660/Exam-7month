import http from "./config";

const productsApi = {
  create: (data) => http.post("/product", data),
  get: () => http.get("/products", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete(`/product/${id}`),
};
export default productsApi;
