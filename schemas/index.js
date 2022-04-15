const mongoose = require("mongoose");

//mongoose와 DB를 연결
const connect = () => {
  mongoose.connect(
    "mongodb://localhost:3000/cloneProj",
    {
      ignoreUndefined: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log("Mongo DB Connect Error");
      else console.log("Mongo DB Connect Success");
    }
  );
};

mongoose.console.on("error", (err) => {
  console.log("몽고디비 연결 에러", err);
});

module.exports = connect;
