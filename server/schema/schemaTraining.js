const mongoose = require("mongoose");

const trainingSchema = mongoose.Schema(
  {
    name: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    chapters : [{
        name : {
          String
        },
        sessions : [{
            exercise : {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Exercise'
            },
            repetitions : {
              type: Number
            }
        }],
        repetitions : {
          type: Number
        }
    }]    
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Training", trainingSchema);