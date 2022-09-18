import mongoose from "mongoose";

const conectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.orange.underline.bold);
    process.exit(1);
  }
};

export default conectDB;