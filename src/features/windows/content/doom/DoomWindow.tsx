import type { JSX } from "react";

import type { WindowContentProps } from "@/types/window.types";

export default function DoomWindow({}: WindowContentProps): JSX.Element {
  return (
    <div className="flex h-full flex-col bg-black text-[12px] text-[#f5e9dd]">
      <iframe
        title="DOOM"
        src="/doom/index.html"
        className="h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen; gamepad"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-downloads"
      />
    </div>
  );
}
