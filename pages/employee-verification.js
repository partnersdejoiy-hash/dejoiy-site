import EmployeeDocumentPage from "../components/EmployeeDocumentPage";
export default function Verification(props) {
  return <EmployeeDocumentPage {...props} verification />;
}
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "private, no-store");
  const { portalAvailable } = await import("../lib/documents/store.mjs");
  return { props: { ticketing: process.env.ORBITDESK_ENABLED === "true", enabled: process.env.ORBITDESK_ENABLED === "true" ? false : await portalAvailable() } };
}
