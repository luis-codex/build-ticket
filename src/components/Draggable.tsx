import { useDraggable } from "@dnd-kit/core";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  id: string;
  refContainer: React.RefObject<HTMLUListElement | null>
  title: string;
  pathImage: string;
};

export default function Draggable(props: Props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    data: { pathImage: props.pathImage }
  });

  useEffect(() => {
    if (isDragging) {
      props.refContainer.current?.style.setProperty("overflow", "hidden");
    } else {
      props.refContainer.current?.style.setProperty("overflow", "auto");
    }
  }, [isDragging]);

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      title={props.title}
      aria-describedby={`draggable-${props.id}`}
      className={props.className}
    >
      {props.children}
    </button>
  );
}
