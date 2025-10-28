import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
const Search = () => {
  return (
    <div className="flex items-center p-4 justify-between">
      <ChevronLeft />
      <Input placeholder="search" className="w-65 " />
      <Button className="bg-white border-none text-black">cancel</Button>
    </div>
  );
};

export default Search;
