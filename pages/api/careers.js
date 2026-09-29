import { createHandler } from "../../lib/form-handler.mjs";
export const config = { api: { bodyParser: { sizeLimit: "3mb" } } };
export default createHandler("careers");
