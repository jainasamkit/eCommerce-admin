import app from "./src/app.js";
import { PORT } from "./src/config.js";

import connectDB from "./src/database/db.js";
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
