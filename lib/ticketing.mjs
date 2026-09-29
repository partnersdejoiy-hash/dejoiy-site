import { createHmac } from "node:crypto";
import { getVercelOidcToken } from "@vercel/oidc";
export async function createVerificationTicket(values, attachment, requestId, {env=process.env, fetcher=fetch, getIdentityToken=getVercelOidcToken}={}) {
  const origin=new URL(env.ORBITDESK_URL || "");
  if (origin.protocol!=="https:" && !(env.NODE_ENV==="test" && origin.hostname==="127.0.0.1")) throw new Error("Ticketing requires HTTPS");
  if (origin.username || origin.password || origin.search || origin.hash || origin.pathname!=="/") throw new Error("Use the ticketing origin only");
  const secret=env.ORBITDESK_INTAKE_SECRET;
  const body=JSON.stringify({...values,requestId,consent:true,attachment:{...attachment,type:"application/pdf"}});
  const timestamp=String(Date.now());
  let authentication;
  if (secret && secret.length >= 32) {
    authentication={"X-DEJOIY-Timestamp":timestamp,"X-DEJOIY-Signature":createHmac("sha256",secret).update(timestamp+"."+body).digest("hex")};
  } else if (env.VERCEL === "1" && env.VERCEL_ENV === "production") {
    // Send the platform-issued identity only to our dedicated ticketing service.
    // Never forward caller-provided Authorization or OIDC headers.
    if (origin.origin !== "https://orbitdesk-dejoiy.vercel.app") throw new Error("Untrusted identity destination");
    const token=await getIdentityToken();
    if (!token) throw new Error("Workload identity is unavailable");
    authentication={Authorization:`Bearer ${token}`};
  } else throw new Error("Ticketing is not configured");
  const response=await fetcher(new URL("/api/integrations/business-site/verification",origin),{
    method:"POST",redirect:"error",signal:AbortSignal.timeout(15000),
    headers:{"Content-Type":"application/json",...authentication},body,
  });
  const result=await response.json();
  if (!response.ok || result.success!==true || !/^DJ-(BGV|EV)-[A-F0-9]{16}$/.test(result.ticketNumber || "")) throw new Error("Ticketing did not confirm storage");
  return result.ticketNumber;
}
