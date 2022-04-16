const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
};

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

// //mongoose와 DB를 연결
// const connect = () => {
//   mongoose.connect(
//     "mongodb://localhost:27017/cloneProj",
//     {
//       ignoreUndefined: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (error) => {
//       if (error) console.log("Mongo DB Connect Error");
//       else console.log("Mongo DB Connect Success");
//     }
//   );
// };

// mongoose.connection.on("error", (err) => {
//   console.log("몽고디비 연결 에러", err);
// });

module.exports = connect;
