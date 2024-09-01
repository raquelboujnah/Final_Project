const express = require("express");
const cors = require("cors");
const path = require('path')
const router = require('./routes/dogRoutes.js');

const app = express()
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/dog', router);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening on ${process.env.PORT || 5000}`);
});
 
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



