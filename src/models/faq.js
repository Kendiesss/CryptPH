import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true, 
    },
    answer: {
        type: String,
        required: true, 
    },
    category: {
        type: String, 
        required: false,
    },
    visibility: {
        type: String,
        default: 'visible',  // Default to 'visible' if not set
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

export default mongoose.models.FAQ || mongoose.model("FAQ", faqSchema);
