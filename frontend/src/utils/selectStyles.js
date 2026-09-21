export const lightSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#7c5cf0" : "#cbd5e1",
    boxShadow: state.isFocused ? "0 0 0 4px #ece9fe" : "none",
    minHeight: "2.75rem",
    borderRadius: "0.75rem",
    "&:hover": { borderColor: "#7c5cf0" },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(16,24,40,0.1)",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#6640e0"
      : state.isFocused
      ? "#f5f4ff"
      : "white",
    color: state.isSelected ? "white" : "#1c1c28",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#f5f4ff",
    borderRadius: "0.5rem",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#5631c2",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#8b7cd8",
    borderRadius: "0 0.5rem 0.5rem 0",
    ":hover": {
      backgroundColor: "#dad3fd",
      color: "#46299d",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#94a3b8",
  }),
  input: (base) => ({
    ...base,
    color: "#1c1c28",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#1c1c28",
  }),
};
