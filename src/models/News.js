// In your News model file (e.g., News.js)
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: true,
    },
    imageType: { // Add this line
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
