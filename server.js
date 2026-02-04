import app from "./src/app.js";
import { PORT } from "./src/config/env.js";

import connectDB from "./src/config/db.js";
await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
