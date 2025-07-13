import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"MarkIt"
        })
        console.log("DB Connected");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connect;