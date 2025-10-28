import { Button } from "@/components/ui/button";

import Link from "next/link";
import { PostHeader } from "../_components/PostHeader";

const GeneratePage = () => {
  return (
    <div className="h-[90vh]">
      <PostHeader />
      <div className="flex flex-col gap-[24px] items-center justify-center h-full  ">
        <img src="/generate.png" alt="" className="w-[128px] h-[97px]" />

        <div className="flex flex-col gap-2  ">
          <Link href="/photos">
            <Button className="bg-[#0095F6] w-[147px] py-2 px-4 flex justify-center items-center rounded-md hover:bg-blue-600">
              Photo library
            </Button>
          </Link>
          <Link href="/create">
            <Button className="bg-white w-[147px]  text-[#0095F6] rounded-md py-[8px] px-[16px]">
              Generate with ai
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GeneratePage;
