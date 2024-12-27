import { useDroppable } from "@dnd-kit/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
};

export default function Droppable(props: Props) {
  const { setNodeRef } = useDroppable({
    id: "droppable-ticket"
  });
  const style = {
    ...props.style
  };
  return (
    <div
      id="droppable-ticket"
      ref={setNodeRef}
      style={style}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
