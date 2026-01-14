import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide news details"],
    },
    category: {
      type: String,
      required: true,
      // You can add more categories here as needed
      enum: ["Politics", "Business", "Sports", "Technology", "Entertainment", "International"],
      index: true, // Indexed for faster searching
    },
    district: {
      type: String,
      required: true,
      index: true, // Indexed for faster lookups on the map
    },
    image: {
      type: String,
      required: false, // Optional: A default image can be handled in the UI if missing
    },
    author: {
      type: String,
      default: "PH Reporter",
    },
    isBreaking: {
      type: Boolean,
      default: false, // Used for the Breaking News section
    },
    isFeatured: {
      type: Boolean,
      default: false, // Used for the Hero section or Featured News
    },
    popularity: {
      type: Number,
      default: 0, // Used to track and increase view counts
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt (needed for sorting by date)
  }
);

// Compile the model (checks if the model already exists to avoid recompilation errors in Next.js)
const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;