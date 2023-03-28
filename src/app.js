const express = require("express");
const morganmiddleware = require("./middlewares/morgan.middleware");
const app = express();

app.use(express.json({
    limit: '20mb'
}));

app.use(express.urlencoded({
    extended: false
}));

app.use(morganmiddleware);

app.use("/", (req, res)=>{
    return res.status(200).json({
        success: true,
        message: "Welcome",
    })
})


module.exports = app;