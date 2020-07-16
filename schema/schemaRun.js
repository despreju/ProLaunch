const mongoose = require("mongoose");

const runSchema = mongoose.Schema(
  {
    training : {
        type: String           
    },      
    user : {
        type: String
    },
    duration : {
        type: Number
    },
    state : {
        type: String
    }   
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("run", runSchema);