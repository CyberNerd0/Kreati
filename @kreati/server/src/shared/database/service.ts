import mongoose from "mongoose";
import config from "../config";

namespace DatabaseService {
  export async function connect() {
    await mongoose.connect(config.db.url)
  }
}

export default DatabaseService;
