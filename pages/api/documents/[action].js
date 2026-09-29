import { createPortal } from "../../../lib/documents/service.mjs";
export const config = {
  api: { bodyParser: { sizeLimit: "3mb" }, responseLimit: "4mb" },
};
export default createPortal();
