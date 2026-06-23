import type { JSX } from "react";

import type { WindowContentProps } from "@/types/window.types";

export default function ContactWindow({}: WindowContentProps): JSX.Element {
  return (
    <div className="space-y-3 p-3 text-[12px] leading-relaxed text-[#10233f]">
      <h2 className="text-[14px] font-bold">Contact</h2>
      <p>
        Aberto a colaborações em desenvolvimento web full stack, inteligência
        artificial, automações e sistemas orientados por dados.
      </p>
      <ul className="list-inside list-disc space-y-1">
        <li>
          Email:{" "}
          <a
            className="text-[#174cbe] underline"
            href="mailto:civalskialisson@gmail.com"
          >
            civalskialisson@gmail.com
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            className="text-[#174cbe] underline"
            href="https://www.linkedin.com/in/alisson-civalski/"
            target="_blank"
            rel="noreferrer"
          >
            /in/alisson-civalski
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            className="text-[#174cbe] underline"
            href="https://github.com/Civalski"
            target="_blank"
            rel="noreferrer"
          >
            @Civalski
          </a>
        </li>
        <li>
          Instagram:{" "}
          <a
            className="text-[#174cbe] underline"
            href="https://www.instagram.com/kayn_1999/"
            target="_blank"
            rel="noreferrer"
          >
            @kayn_1999
          </a>
        </li>
      </ul>
    </div>
  );
}
