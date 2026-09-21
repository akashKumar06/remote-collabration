import { motion } from "framer-motion";
import { Pencil, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { close, open, setActiveComponent } from "../../../app/slices/modal";
import { delay } from "../../../utils/delay";
import toast from "react-hot-toast";
import { marked } from "marked";
import { updateProjectDescription } from "../../../app/slices/project/projectThunk";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

function Description({ currentProject }) {
  const { state } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");

  const [openGenerateInput, setOpenGenerateInput] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function stripMarkdown(md) {
    return md
      .replace(/!\[.*\]\(.*\)/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/[#_*~`>[\]()\-!\]]/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  const descriptionText = currentProject?.description || "";
  const plainText = stripMarkdown(descriptionText);

  const words = plainText.split(" ").filter(Boolean);
  const wordLimit = 100;
  const isLong = words.length > wordLimit;

  function getTruncatedMarkdown(md, limit) {
    const plain = stripMarkdown(md);
    const wordArr = plain.split(" ").filter(Boolean);
    if (wordArr.length <= limit) return md;
    const truncated = wordArr.slice(0, limit).join(" ") + "...";
    return truncated;
  }
  const handleSaveDescription = async () => {
    setIsSaving(true);
    dispatch(
      updateProjectDescription({
        projectId: currentProject._id,
        description,
      })
    )
      .unwrap()
      .then(() => {
        setOpenGenerateInput((prev) => !prev);
        setIsGenerated(false);
        setIsSaving(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsSaving(false);
      });
  };

  const handleGenerateWithAI = async () => {
    setDescription("");
    setIsGenerating(true);
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/api/v1/projects/ai/generate-project`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: prompt }),
      }
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setDescription((prev) => prev + chunk);
    }
    setIsGenerating(false);
    setIsGenerated(true);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button
          variant={openGenerateInput ? "outline" : "secondary"}
          size="sm"
          onClick={() => setOpenGenerateInput((prev) => !prev)}
        >
          {!openGenerateInput ? (
            <>
              <Sparkles size={15} /> Generate description with AI
            </>
          ) : (
            <>
              <X size={15} /> Cancel
            </>
          )}
        </Button>
        {openGenerateInput && (
          <Button size="sm" onClick={handleGenerateWithAI} loading={isGenerating}>
            Generate
          </Button>
        )}
      </div>

      {openGenerateInput && (
        <Input
          type="text"
          placeholder="Enter project idea..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      )}
      {openGenerateInput && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-surface p-6"
        >
          <div className="flex items-end justify-end">
            {isGenerated && (
              <Button size="sm" onClick={handleSaveDescription} loading={isSaving}>
                Save
              </Button>
            )}
          </div>
          <div
            className="prose prose-sm max-w-none prose-slate"
            dangerouslySetInnerHTML={{ __html: marked(description) }}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-surface p-6"
      >
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-base font-semibold text-slate-900">Project Description</h2>
          <button
            className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium shrink-0"
            onClick={async () => {
              if (state) {
                dispatch(close());
                await delay(700);
              }
              dispatch(open());
              dispatch(setActiveComponent("set_project_description"));
            }}
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
        <div
          className="prose prose-sm max-w-none prose-slate text-slate-600"
          dangerouslySetInnerHTML={{
            __html: marked(
              expanded || !isLong
                ? descriptionText
                : getTruncatedMarkdown(descriptionText, wordLimit)
            ),
          }}
        />
        {isLong && (
          <button
            className="cursor-pointer mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default Description;
