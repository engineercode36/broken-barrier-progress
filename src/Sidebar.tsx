import { FolderIcon, HashIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export const Sidebar = () => {
  const folders = [
    { id: 1, name: "Personal" },
    { id: 2, name: "Work" },
    { id: 3, name: "Projects" }
  ];

  const tags = [
    { id: 1, name: "important", color: "bg-red-500" },
    { id: 2, name: "ideas", color: "bg-blue-500" },
    { id: 3, name: "todo", color: "bg-green-500" }
  ];

  return (
    <div className="w-64 h-screen border-r bg-white p-4 flex flex-col">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Notes</h1>
        <div className="relative">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-8" />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Folders</h2>
        <ul className="space-y-1">
          {folders.map(folder => (
            <li key={folder.id}>
              <button className="w-full text-left px-2 py-1.5 rounded-md hover:bg-secondary flex items-center space-x-2">
                <FolderIcon className="h-4 w-4" />
                <span>{folder.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Tags</h2>
        <ul className="space-y-1">
          {tags.map(tag => (
            <li key={tag.id}>
              <button className="w-full text-left px-2 py-1.5 rounded-md hover:bg-secondary flex items-center space-x-2">
                <div className={`h-3 w-3 rounded-full ${tag.color}`} />
                <span>{tag.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};