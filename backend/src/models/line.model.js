import mongoose from "mongoose";
const lineSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    projectId: {
      type: String,
      required: true,
      index: true,
    },

    points: {
      type: [Number],
      required: true,
    },
    color: { type: String, required: true },
    strokeWidth: { type: Number, required: true },
    tool: { type: String, required: true, enum: ["pen", "eraser"] },
  },
  { timestamps: true }
);

lineSchema.index({ id: 1, projectId: 1 }, { unique: true });

const WhiteboardLine = mongoose.model("WhiteboardLine", lineSchema);
export default WhiteboardLine;
