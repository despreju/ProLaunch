const mongoose = require("mongoose");
const Exercice = require('./schemaExercise');

const trainingSchema = mongoose.Schema(
  {
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    exercice : {
      type: mongoose.Types.ObjectId,
      ref: 'Exercice'
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Training", trainingSchema);