import { $ } from "@/utils/domUtils";
import { toPng } from "html-to-image";

const handleClickBtnDwl = async () => {
  const node = $<HTMLDivElement>("#droppable-ticket");
  const {width,height } = node?.getBoundingClientRect()!
  
  if (!node) {
    console.error("ticket not found");
    return;
  }

  const dataUrl = await toPng(node, {
    quality: 1,
    skipAutoScale: true,
    pixelRatio: 1,
    canvasWidth: width,
    canvasHeight: height,
    width: width,
    height: height
  });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "ticket.png";
  a.click();
};

function BtnDwl() {
  return (
    <button onClick={handleClickBtnDwl} className="btn-v1 block">
      download
    </button>
  );
}

export default function TicketActions() {
  return (
    <div
      style={ { 
        display: "flex",
        justifyContent: "center",
        padding: "10px"
      }}
    >
      <BtnDwl />
    </div>
  );
}
