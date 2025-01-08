import { Button } from "@/components/ui/button";
import { Share2, Tag, Bookmark } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const QuestionActions = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="ghost" size="icon">
        <Share2 className="h-4 w-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Tag className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Easy</DropdownMenuItem>
          <DropdownMenuItem>Medium</DropdownMenuItem>
          <DropdownMenuItem>Hard</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="ghost" size="icon">
        <Bookmark className="h-4 w-4" />
      </Button>
    </div>
  );
};