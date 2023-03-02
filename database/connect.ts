import mongoose from "mongoose";

const connect = (url: string) => {
  mongoose.connect(url);
  console.log("connected");
};

export default connect;
