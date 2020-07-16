const mongoose = require("mongoose");

const runSchema = mongoose.Schema(
  {
    training : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training'            
    },      
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
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