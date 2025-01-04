const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Interaction = require("./models/Interactions"); 

const app = express();

app.use(express.json());
app.use(cors());


connectDB();

app.get("/interactions", async (req, res) => {
  try {
    const interactions = await Interaction.find().sort({ meetingDate: -1 }); // Sort by most recent
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching interactions" });
  }
});

app.post("/interactions", async (req, res) => {
  try {
    const { userName, meetingType, meetingDate, notes } = req.body;

    if (!userName || !meetingType || !meetingDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const interaction = new Interaction({
      userName,
      meetingType,
      meetingDate,
      notes,
    });

    await interaction.save();
    res.status(201).json(interaction);
  } catch (error) {
    res.status(500).json({ error: "Error saving interaction" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
