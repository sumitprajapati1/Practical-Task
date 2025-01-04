const mongoose = require("mongoose");


const interactionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  meetingType: {
    type: String,
    required: true,
    enum: ["Call", "Email", "Meeting"], 
  },
  meetingDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

const Interaction = mongoose.model("Interaction", interactionSchema);
module.exports = Interaction;