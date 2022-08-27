import express from "express";
import cors from "cors";

import { userRoutes} from './routes/userRoutes'

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
  console.log("Running app on PORT: " + PORT);
});
