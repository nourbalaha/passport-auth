const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");


// Routes
app.use("/",require("./routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})