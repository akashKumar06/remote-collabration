import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Link, ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { close, open, setActiveComponent } from "../../../app/slices/modal";
import { delay } from "../../../utils/delay";
import api from "../../../api/axios";
import toast from "react-hot-toast";
import { marked } from "marked";
import { updateProjectDescription } from "../../../app/slices/project/projectThunk";
import MileStones from "./MileStones";
import Timeline from "../../../components/Timeline";
import ProjectQuickStats from "./ProjectQuickStats";
import SplashScreen from "../../../components/SplashScreen";
import { useParams } from "react-router";
import { getCurrentProject } from "../../../app/slices/project/projectSlice";

export default function Overview() {
  const dispatch = useDispatch();
  const { state } = useSelector((state) => state.modal);
  const { projectId } = useParams();
  const [newMember, setNewMember] = useState("");

  const [isInviting, setIsInviting] = useState(false);

  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  const [resources] = useState([
    { label: "GitHub Repo", url: "https://github.com/example/repo" },
    { label: "Figma Design", url: "https://figma.com/file/xyz" },
  ]);
  const { currentProject } = useSelector((state) => state.project);
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
      .replace(/[#_*~`>[\]()\-!\[\]]/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Get description text and word count
  const descriptionText = currentProject?.description || "";
  const plainText = stripMarkdown(descriptionText);
  const words = plainText.split(" ").filter(Boolean);
  const wordLimit = 100;
  const isLong = words.length > wordLimit;

  // Get truncated markdown for preview
  function getTruncatedMarkdown(md, limit) {
    const plain = stripMarkdown(md);
    const wordArr = plain.split(" ").filter(Boolean);
    if (wordArr.length <= limit) return md;
    const truncated = wordArr.slice(0, limit).join(" ") + "...";
    return truncated;
  }

  const handleAddMember = async () => {
    setIsInviting(true);
    const memberData = {
      email: newMember.trim(),
    };

    try {
      const res = await api.post(
        `/projects/${currentProject._id}/invite`,
        memberData
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setIsInviting(false);
    setNewMember("");
  };
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
    <div className="max-w-7xl mx-auto px-6 py-10 text-white space-y-8">
      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel */}
        <div className="flex-1 space-y-6">
          {/* Description */}
          <div className="flex gap-4">
            <button
              onClick={() => setOpenGenerateInput((prev) => !prev)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
            >
              {!openGenerateInput
                ? "Generate project description with AI"
                : "Cancel"}
            </button>
            {openGenerateInput && (
              <button
                onClick={handleGenerateWithAI}
                className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            )}
          </div>
          {openGenerateInput && (
            <input
              type="text"
              placeholder="Enter project idea..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 w-full p-2.5 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none"
            />
          )}
          {openGenerateInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#2A2A2A] border border-gray-700 p-6 rounded-2xl"
            >
              <div className="flex items-end justify-end">
                {isGenerating && <p1>...</p1>}
                {isGenerated && (
                  <button
                    onClick={handleSaveDescription}
                    className="px-4 py-1 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                  >
                    {isSaving ? "Saving" : "Save  "}
                  </button>
                )}
              </div>
              <div
                className="prose text-gray-300 prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: marked(description) }}
              />
              {/* <p className="text-gray-300">{description}</p> */}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#2A2A2A] border border-gray-700 p-6 rounded-2xl"
          >
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold mb-2">
                Project Description
              </h2>
              <button
                className="flex items-center gap-1 text-sm text-blue-400 hover:underline"
                onClick={async () => {
                  if (state) {
                    dispatch(close());
                    await delay(700);
                  }
                  dispatch(open());
                  dispatch(setActiveComponent("set_project_description"));
                }}
              >
                <Pencil size={16} /> Edit
              </button>
            </div>
            <div
              className="prose text-gray-300 prose-invert max-w-none"
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
                className="mt-2 px-3 py-1 rounded bg-blue-700 text-white text-sm hover:bg-blue-800"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </motion.div>
          {/* Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-2xl"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsMembersOpen(!isMembersOpen)}
            >
              <h2 className="text-lg font-semibold">Project Members</h2>
              {isMembersOpen ? <ChevronDown /> : <ChevronRight />}
            </div>
            {isMembersOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 mt-4">
                  {currentProject.members.map((member) => (
                    <div key={member._id} className="flex items-center gap-3">
                      <User size={18} className="text-pink-400" />
                      <span>{member.user.firstname}</span>
                      <span className="ml-auto text-sm text-gray-400 italic">
                        {member.role}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-6">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                    className="cursor-pointer flex-1 p-2.5 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    onClick={handleAddMember}
                    className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                    disabled={isInviting}
                  >
                    {isInviting ? "Inviting..." : "Invite"}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2A2A2A] p-6 rounded-2xl border border-gray-700"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
            >
              <h2 className="text-lg font-semibold">Resources</h2>
              {isResourcesOpen ? <ChevronDown /> : <ChevronRight />}
            </div>
            {isResourcesOpen && (
              <ul className="space-y-3 mt-4 text-blue-400">
                {resources.map((res, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Link size={16} />
                    <a href={res.url} target="_blank" rel="noopener noreferrer">
                      {res.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
        {/* Right Sidebar */}
        <div className="w-full lg:w-[300px] space-y-6">
          <Timeline activities={currentProject.activityLogs} />
          <MileStones />
          <ProjectQuickStats />
        </div>
      </div>
    </div>
  );
}
