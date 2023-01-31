const express = require("express");

const  mongoose  = require("mongoose");


const dotenv = require("dotenv").config()
// process.env.mongo_url
mongoose.connect("mongodb://localhost/api_web_tech_assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => { console.log("connect to cloud db") })

const data = require("./routes/data");




const app = express();
// const cors = require("cors");

// app.use(cors({
//     origin: "*",
// }))
const port = 3005
app.use(express.json());                                

app.use("/", data)
app.get("*", (req, res) => {
    res.status(404).json("page not found")
})
app.listen(port, () => {
    console.log(`server started at port http://localhost:${port}`)
})

