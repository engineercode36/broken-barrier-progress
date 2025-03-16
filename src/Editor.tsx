import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

export const Editor = () => {
  const [value, setValue] = useState("# Welcome to your notes!\n\nStart writing in markdown format...");

  return (
    <div className="flex-1 p-6">
      <MDEditor
        value={value}
        onChange={(val) => setValue(val || "")}
        preview="edit"
        height={500}
        className="w-full"
      />
    </div>
  );
};