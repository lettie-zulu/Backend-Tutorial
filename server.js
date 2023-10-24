const express = require('express');
//used for building rest apis
const bodyParser = require("body-parser");
//helps parse request and create the req.body object
const cors = require("cors");
//provides express middleware to enable cors with various options

const app = express()

var corsOptions = {
    origin: "http://localhost:8001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models")
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Connected to the database!")
})
.catch(err=>{
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Natasha's Tutorial application." });
});

require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});