const express = require("express");
const app = express();

app.get("/logout", (req, res) =>{
    return res
        .clearCookie("access_token")
        .status(200)
});