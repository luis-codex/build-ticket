import { randomMinMax } from "@/utils/romdom";
import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useRef, useState } from "react";

const Overlay = () => {
  const [pathImage, setPathImage] = useState<string | null>(null);
  const [dropAnim, setDropAnim] = useState<null | undefined>(undefined);

  const ref = useRef<HTMLImageElement>(null);
  useDndMonitor({
    onDragStart({ active }) {
      setPathImage(active.data.current!.pathImage);
    },
    onDragEnd({ collisions }) {
      setPathImage(null);

      const math = collisions?.findIndex((m) => m.id === "droppable-ticket");

      if (math !== -1) {
        setDropAnim(null);
        const img = document.createElement("img");
        img.src = pathImage!;
        img.alt = "sticker";
        img.style.position = "absolute";
        img.classList.add("icon-sticker");
        img.style.transform = `rotate(${randomMinMax(-12, 12)}deg)`;

        const droppable = document.getElementById("droppable-ticket-wrapper");

        const { left: overLeft, top: overTop } =
          ref.current!.getBoundingClientRect();

        const { left: droppableLeft, top: droppableTop } =
          droppable!.getBoundingClientRect();

        img.style.left = `${overLeft - droppableLeft}px`;
        img.style.top = `${overTop - droppableTop}px`;

        droppable?.appendChild(img);
      } else {
        setDropAnim(undefined);
      }
    }
  });
  return (
    <DragOverlay
      modifiers={[restrictToWindowEdges]}
      dropAnimation={dropAnim}
    >
      {pathImage && (
        <img
          src={pathImage}
          alt="dragging"
          className="icon-sticker"
          ref={ref}
        />
      )}
    </DragOverlay>
  );
};

export default Overlay;
