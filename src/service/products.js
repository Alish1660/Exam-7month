import http from "./config";

const products = {
  create: (data) => http.post("/product", data),
};
export default products;
