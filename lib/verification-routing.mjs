export function verificationRecipient(type, env) {
  if (type === "background-verification") return env.BGV_TO_EMAIL;
  if (type === "employment-verification") return env.VERIFICATION_TO_EMAIL;
  return undefined;
}
