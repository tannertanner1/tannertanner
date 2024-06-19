import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Loader2 className="size-24 animate-spin" />
    </div>
    // flex pl-2 m-0
    // <div className="flex justify-center">
    //   <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash" />
    //   <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]" />
    //   <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]" />
    // </div>
  );
}
