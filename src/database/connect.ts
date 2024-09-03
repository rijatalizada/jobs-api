import mongoose from "mongoose";

const connect = (url: string) => {
  mongoose.connect(url);
  mongoose.set("strictQuery", false);
  console.log("connected");
};

export default connect;
