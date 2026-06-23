"use client";

import { useCallback, useRef, useState } from "react";
import type { JSX, PointerEvent as ReactPointerEvent } from "react";

import type { WindowContentProps } from "@/types/window.types";

const COLORS = ["#000000", "#ffffff", "#ff0000", "#ffcc00", "#008000", "#0066ff"];

export default function PaintWindow({}: WindowContentProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const getCanvasPoint = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>): { x: number; y: number } => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();

      return {
        x: ((event.clientX - rect.left) / rect.width) * canvas.width,
        y: ((event.clientY - rect.top) / rect.height) * canvas.height,
      };
    },
    [],
  );

  const drawPoint = useCallback(
    (event: ReactPointerEvent<HTMLCanvasElement>): void => {
      const canvas = canvasRef.current;

      if (canvas === null) {
        return;
      }

      const context = canvas.getContext("2d");

      if (context === null) {
        return;
      }

      const point = getCanvasPoint(event);
      context.lineTo(point.x, point.y);
      context.strokeStyle = selectedColor;
      context.lineWidth = brushSize;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.stroke();
    },
    [brushSize, getCanvasPoint, selectedColor],
  );

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLCanvasElement>,
  ): void => {
    const canvas = event.currentTarget;
    const context = canvas.getContext("2d");

    if (context === null) {
      return;
    }

    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    setIsDrawing(true);
    drawPoint(event);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLCanvasElement>,
  ): void => {
    if (!isDrawing) {
      return;
    }

    drawPoint(event);
  };

  const stopDrawing = (event: ReactPointerEvent<HTMLCanvasElement>): void => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDrawing(false);
  };

  const clearCanvas = (): void => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const context = canvas.getContext("2d");

    if (context === null) {
      return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex h-full flex-col bg-[#d4d0c8] text-[12px] text-[#10233f]">
      <div className="flex min-h-10 flex-wrap items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className="h-6 w-6 border border-[#808080] shadow-[inset_1px_1px_0_#fff]"
            style={{
              backgroundColor: color,
              outline: color === selectedColor ? "2px solid #2452b8" : "none",
            }}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select ${color}`}
          />
        ))}
        <label className="ml-2 flex items-center gap-2">
          Size
          <input
            type="range"
            min="1"
            max="18"
            value={brushSize}
            onChange={(event) => setBrushSize(Number(event.target.value))}
          />
        </label>
        <button
          type="button"
          className="ml-auto rounded border border-[#808080] bg-[#ece9d8] px-3 py-1 shadow-[inset_1px_1px_0_#fff]"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
      <div className="min-h-0 flex-1 bg-[#808080] p-3">
        <canvas
          ref={canvasRef}
          width={1200}
          height={760}
          className="h-full w-full cursor-crosshair bg-white shadow-[1px_1px_0_#404040]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
        />
      </div>
    </div>
  );
}
