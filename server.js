const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const prenotationRouter = require("./routers/eventRouter");



const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Benvenuto nell'homepage");
});

//rotta x prenotation router
app.use("/event", prenotationRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});