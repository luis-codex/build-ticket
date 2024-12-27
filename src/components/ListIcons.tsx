import { useRef } from "react";
import Draggable from "./Draggable";
import type { ListImage } from "./types";

type Props = {
  listImages: ListImage[];
};

export default function ListIcons({ listImages }: Props) {
  const relUl = useRef<HTMLUListElement>(null);

  return (
      <ul
        className="ticket-list"
        ref={relUl}
        style={{
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
        }}
      >
        {listImages.map((image) => (
          <Draggable
            key={image.path}
            id={image.id}
            refContainer={relUl}
            title={image.name}
            pathImage={image.path}
          >
            <img
              src={image.path}
              alt={ image.name }
              className="icon-sticker"
            />
          </Draggable>
        ))}
      </ul>
  );
}
