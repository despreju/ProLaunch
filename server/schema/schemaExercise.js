const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    difficulty: {
         type: Number,
         required: true
    },
    location: {
        type: String,
        lowercase: true,
        trim: true,
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Exercise", exerciseSchema);