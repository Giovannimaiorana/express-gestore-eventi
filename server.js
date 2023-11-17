const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const prenotationRouter = require("./routers/eventRouter");
const errorMiddle = require("./middlewares/error");
const errorPage = require("./middlewares/routeNotFound");



const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Benvenuto nell'homepage");
});

//rotta x prenotation router
app.use("/events", prenotationRouter);

app.use(errorMiddle);
app.use(errorPage);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});