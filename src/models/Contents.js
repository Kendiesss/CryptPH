import mongoose from "mongoose";

const ContentsSchema = new mongoose.Schema({
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
        required: true,  // This will store the Cloudinary image URL
    },
    imageType: {
        type: String,
        required: true,  // To store the image type (e.g., 'image/png')
    },
    imagePublicId: {
        type: String,
        required: true, // Public ID from Cloudinary for deleting the image
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

export default mongoose.models.Contents || mongoose.model("Contents", ContentsSchema);
