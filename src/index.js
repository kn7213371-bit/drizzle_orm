import exress from "express";
import { todoRouter } from "../routes/todo.routes.js";

process.loadEnvFile()
const app = exress();
app.use(exress.json())

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});


app.use("/todo",todoRouter)
app.use((err, req, res, next) => {
  console.log("err", err);
  res.status(500).json({ error: "something went wrong" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});


