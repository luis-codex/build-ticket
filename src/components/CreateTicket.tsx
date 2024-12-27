import "./ticket-styles.css"
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import ListIcons from "./ListIcons";
import Overlay from "./Overlay";
import Ticket from "./Ticket";
import TicketActions from "./TicketActions";
import type { ListImage } from "./types";

type Props = {
  listImages: ListImage[];
};

export default function CreateTicket({ listImages }: Props) {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  return (
    <DndContext sensors={sensors}>
      <div className="build-container">
            <ListIcons listImages={listImages} />
          <div className="ticket-container">
            <Ticket />
            <TicketActions />
          </div>
        <Overlay />
      </div>
    </DndContext>
  );
}
