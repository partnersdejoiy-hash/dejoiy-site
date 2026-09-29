import EmployeeDocumentPage from "../components/EmployeeDocumentPage";
export default function Documents(props) {
  return <EmployeeDocumentPage {...props} />;
}
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "private, no-store");
  const { portalAvailable } = await import("../lib/documents/store.mjs");
  return { props: { enabled: await portalAvailable() } };
}
