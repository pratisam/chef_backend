import client from "./client.mjs";

const dbConnect = () => {
    client.connect((err) => {
        if (err) {
            console.error("connection error", err.stack);
        } else {
            console.log("connected from DB");
        }
    });
};

export default dbConnect;
