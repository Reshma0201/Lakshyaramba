import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import connectdb from './config/db.js';


// configure dotenv
dotenv.config({ path: ".env" });

// create http server
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await connectdb();
    server.listen(PORT, () => {
        console.log(`server running on ${PORT}`);
    });
};


// RUN THE FUNCTION
startServer(); 
//resolving deltas: 100% (2/2), completed with 2 local objects to https: 