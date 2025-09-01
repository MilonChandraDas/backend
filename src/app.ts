import express from "express";
import UserApp from "./routes/users.js";
import ProductApp from "./routes/products.js";

const app = express();

app.use(express.json());

app.use("/users", UserApp);
app.use("/products", ProductApp);

export default app;