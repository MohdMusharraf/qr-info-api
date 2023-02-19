import http from "http";
import app from "./app.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const server = http.createServer(app);

dotenv.config({ path: './config.env'});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello to QR Code Generator API");
    }
);

const DB = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    twitter: String,
    linkedin: String,
    github: String,
});

const User = mongoose.model("User", userSchema);

app.get("/users", (req, res) => {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });

    console.log("Users fetched");
});

app.post("/users", (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        github: req.body.github,
    });
    user.save();
    console.log("User saved");
});

app.get("/info/:infoID", (req, res) => {
    User.findOne({name: req.params.infoID}, function(err, foundUser){
        if(foundUser){
            res.send(foundUser);
        }
        else{
            res.send("No User Found");
        }
    });
});

