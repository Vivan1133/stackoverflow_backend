const express = require("express");
const { PORT } = require("./config/server-config");
const bodyparser = require("body-parser");
const apiRoutes = require("./routes/index");

const app = express();

const setupAndStartServer = () => {

    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    app.use("/api", apiRoutes);

    
    app.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    })
}

setupAndStartServer();