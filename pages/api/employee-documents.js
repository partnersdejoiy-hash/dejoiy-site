import { createHandler } from "../../lib/form-handler.mjs";
export const config = { api: { bodyParser: { sizeLimit: "32kb" } } };
export default createHandler("employee-documents");
