import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Create user
app.get("/", async (req, res) => {
    res.json("Message");
});



// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
