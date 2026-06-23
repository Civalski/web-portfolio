"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { JSX } from "react";

import IconGrid from "@/features/desktop/components/IconGrid";
import Wallpaper from "@/features/desktop/components/Wallpaper";
import Taskbar from "@/features/taskbar/components/Taskbar";
import Window from "@/features/window/components/Window";
import { getDesktopIcons } from "@/features/windows/hooks/useWindowRegistry";
import {
  WindowManagerProvider,
  useWindowManager,
} from "@/features/windows/hooks/useWindowManager";

const MOBILE_BREAKPOINT = 768;

interface DesktopSurfaceProps {
  isMobile: boolean;
  selectedIconId: string | null;
  onSelectIcon: (iconId: string | null) => void;
}

function DesktopSurface({
  isMobile,
  selectedIconId,
  onSelectIcon,
}: DesktopSurfaceProps): JSX.Element {
  const { activeWindowId, openWindow, openWindows } = useWindowManager();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState<boolean>(false);
  const desktopIcons = useMemo(() => getDesktopIcons(), []);

  const activeMobileWindow = useMemo(() => {
    if (!isMobile) {
      return null;
    }

    const visibleWindows = openWindows.filter(
      (windowInstance) => !windowInstance.minimized,
    );

    const byActiveId = visibleWindows.find(
      (windowInstance) => windowInstance.id === activeWindowId,
    );

    if (byActiveId !== undefined) {
      return byActiveId;
    }

    return (
      [...visibleWindows].sort(
        (left, right) => right.zIndex - left.zIndex,
      )[0] ?? null
    );
  }, [activeWindowId, isMobile, openWindows]);

  const windowsToRender = useMemo(() => {
    if (!isMobile) {
      return openWindows;
    }

    return activeMobileWindow === null ? [] : [activeMobileWindow];
  }, [activeMobileWindow, isMobile, openWindows]);

  return (
    <>
      <main
        className="relative z-10 h-[calc(100dvh-var(--taskbar-height))] overflow-hidden"
        onClick={() => {
          onSelectIcon(null);
          setIsStartMenuOpen(false);
        }}
      >
        <IconGrid
          icons={desktopIcons}
          selectedId={selectedIconId}
          onSelectIcon={onSelectIcon}
          onOpenIcon={(icon) => {
            if (icon.windowType !== undefined) {
              openWindow(icon.windowType);
              setIsStartMenuOpen(false);
            }
          }}
        />
        <div className="desktop-window-layer" aria-live="polite">
          {windowsToRender.map((windowInstance) => (
            <Window
              key={windowInstance.id}
              windowInstance={windowInstance}
              isActive={windowInstance.id === activeWindowId}
              isMobile={isMobile}
            />
          ))}
        </div>
      </main>
      {isStartMenuOpen ? (
        <div
          className="absolute bottom-[var(--taskbar-height)] left-0 z-30 flex w-[380px] max-w-[calc(100vw-12px)] overflow-hidden rounded-t-[7px] border border-[#0b3d91] bg-[#ece9d8] shadow-2xl"
          onClick={(event) => event.stopPropagation()}
          role="menu"
          aria-label="Start menu"
        >
          <div className="w-[92px] bg-gradient-to-b from-[#0c53c4] via-[#245edb] to-[#0b3d91] p-3 text-white">
            <div className="mt-auto origin-bottom-left rotate-180 text-[26px] font-bold tracking-wide [writing-mode:vertical-rl]">
              Windows XP
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#1f62d0] to-[#6aa6ff] p-3 text-white">
              <Image
                src="/assets/xp-icons/user.webp"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded border border-white/70 bg-white/20"
              />
              <span className="text-[16px] font-bold">Alisson Civalski</span>
            </div>
            <div className="grid grid-cols-2 gap-0 bg-white">
              <div className="border-r border-[#d6d2c2] py-2">
                {desktopIcons.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] hover:bg-[#316ac5] hover:text-white"
                    onClick={() => {
                      if (icon.windowType !== undefined) {
                        openWindow(icon.windowType);
                      }
                      setIsStartMenuOpen(false);
                    }}
                    role="menuitem"
                  >
                    <Image
                      src={icon.iconPath ?? "/assets/xp-icons/folder-closed.webp"}
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7"
                    />
                    <span className="truncate">{icon.label}</span>
                  </button>
                ))}
              </div>
              <div className="bg-[#f5f3e7] py-2">
                {["My Computer", "Control Panel", "Help and Support"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className="flex w-full items-center px-3 py-2 text-left text-[12px] text-[#12315f] hover:bg-[#316ac5] hover:text-white"
                      role="menuitem"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="mt-auto flex justify-end gap-2 bg-[#d6e5fb] px-3 py-2">
              <button
                type="button"
                className="rounded border border-[#7f9db9] bg-white px-3 py-1 text-[11px]"
                onClick={() => setIsStartMenuOpen(false)}
              >
                Log Off
              </button>
              <button
                type="button"
                className="rounded border border-[#7f9db9] bg-white px-3 py-1 text-[11px]"
                onClick={() => setIsStartMenuOpen(false)}
              >
                Turn Off Computer
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <Taskbar
        onStartClick={() => {
          setIsStartMenuOpen((isOpen) => !isOpen);
        }}
        showClock
      />
    </>
  );
}

export default function Desktop(): JSX.Element {
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(() => {
    if (typeof window === "undefined") {
      return MOBILE_BREAKPOINT;
    }

    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = useMemo(
    () => viewportWidth < MOBILE_BREAKPOINT,
    [viewportWidth],
  );

  return (
    <div className="relative h-dvh w-full overflow-hidden text-[11px]">
      <Wallpaper imagePath="/assets/wallpapers/bliss.jpg" />
      <WindowManagerProvider>
        <DesktopSurface
          isMobile={isMobile}
          selectedIconId={selectedIconId}
          onSelectIcon={setSelectedIconId}
        />
      </WindowManagerProvider>
    </div>
  );
}
