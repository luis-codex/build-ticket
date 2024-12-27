import { addAnimationAndCallback } from "@/utils/domUtils";
import Droppable from "./Droppable";

const styles = {
  "--border-width": "4px",
  "--radius": "20px",
  "--radius-inner": "calc(var(--radius) - var(--border-width))",
  "--color1": "#ff6890",
  "--color2": "#ff575d",
  "--color3": "#ffe657",
  "--color4": "#6bd7ff",
  "--bg-playground-ticket":
    "linear-gradient(to right, var(--color1), var(--color2), var(--color3), var(--color4))",
  background: "var(--bg-playground-ticket)",
  borderRadius: "var(--radius)",
  padding: "var(--border-width)",

  "--size": "30px",
  "--x-left": "0px",
  "--x-right": "100%",
  "--size-container": "calc(var(--size) - var(--border-width))",

  "--mask-container": `radial-gradient(
      circle at calc(var(--x-left) + var(--border-width)),
      transparent var(--size-container),
      black calc(var(--size-container) + 1px)
    ),
    radial-gradient(
      circle at calc(var(--x-right) - var(--border-width)),
      transparent var(--size-container),
      black calc(var(--size-container) + 1px)
    ),
    linear-gradient(black, black)`,

  "--mask-wrapper": `radial-gradient(
      circle at center left,
      transparent var(--size),
      black calc(var(--size) + 1px)
    ),
    radial-gradient(
      circle at center right,
      transparent var(--size),
      black calc(var(--size) + 1px)
    ),
    linear-gradient(black, black)`,

  mask: "var(--mask-container)",
  maskComposite: "exclude"
} as const;

const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const target = e.target as HTMLElement;
  if (target instanceof HTMLImageElement) {
    addAnimationAndCallback(target, "animation-delete", () => {
      target.remove();
    });
  }
};

export default function Ticket() {
  return (
    <Droppable
      style={styles}
      onDoubleClick={handleDoubleClick}
      id="droppable-ticket"
    >
      <div
        id="droppable-ticket-wrapper"
        style={{
          mask: "var(--mask-wrapper)",
          maskComposite: "exclude"
        }}
      > 
        <div
          id="light"
          style={
            {
              "--mause-x": "50%",
              "--mause-y": "10px",
              background:
                "radial-gradient(circle at var(--mause-x) var(--mause-y), hsl(var(--accent-8)), rgba(0, 0, 0))",
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              zIndex: 2,
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius)",
              opacity: "9%",
              mixBlendMode: "screen",
              backdropFilter: "blur(40px)"
            } as React.CSSProperties
          }
        ></div>
        <div
        >
          <h2 
          >
            <span 
            >
              #
            </span>
            <span contentEditable>Editable</span>
          </h2>
          <div
          ></div>
          <footer>
            <span
              contentEditable
            >
              Editable editable
            </span>
          </footer>
        </div>
        <div
        >
          <span contentEditable>
            Editable editable editable editable editable.
          </span>
        </div>
      </div>
    </Droppable>
  );
}
