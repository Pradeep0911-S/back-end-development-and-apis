const express = require("express");
const path = require("path");

const {
    inputCleaner,
    inputValidator
} = require("./middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/form");
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post(
    "/submit",
    inputCleaner,
    inputValidator,
    (req, res) => {
        res.send(
            `Username: ${req.body.username}<br>Comment: ${req.body.comment}`
        );
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});