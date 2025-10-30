import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
async function dbconnection() {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("Db CONNECTED");
  } catch (err) {
    console.log(`DB NOT CONNECTED ${err}`);
  }
}

export default dbconnection;
