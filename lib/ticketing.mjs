import { createHmac } from "node:crypto";
export async function createVerificationTicket(values, attachment, requestId, {env=process.env, fetcher=fetch}={}) {
  const origin=new URL(env.ORBITDESK_URL || "");
  if (origin.protocol!=="https:" && !(env.NODE_ENV==="test" && origin.hostname==="127.0.0.1")) throw new Error("Ticketing requires HTTPS");
  if (origin.username || origin.password || origin.search || origin.hash || origin.pathname!=="/") throw new Error("Use the ticketing origin only");
  const secret=env.ORBITDESK_INTAKE_SECRET;
  if (!secret || secret.length<32) throw new Error("Ticketing is not configured");
  const body=JSON.stringify({...values,requestId,consent:true,attachment:{...attachment,type:"application/pdf"}});
  const timestamp=String(Date.now());
  const response=await fetcher(new URL("/api/integrations/business-site/verification",origin),{
    method:"POST",redirect:"error",signal:AbortSignal.timeout(15000),
    headers:{"Content-Type":"application/json","X-DEJOIY-Timestamp":timestamp,"X-DEJOIY-Signature":createHmac("sha256",secret).update(timestamp+"."+body).digest("hex")},body,
  });
  const result=await response.json();
  if (!response.ok || result.success!==true || !/^DJ-(BGV|EV)-[A-F0-9]{16}$/.test(result.ticketNumber || "")) throw new Error("Ticketing did not confirm storage");
  return result.ticketNumber;
}
