import RequestForm from "./RequestForm";
export default function VerificationForm() {
  return (
    <RequestForm
      kind="employee-verification"
      submitLabel="Submit verification request"
      attachment={{ label: "Authorisation letter", required: true }}
      fields={[
        {
          name: "company",
          label: "Requesting company",
          autoComplete: "organization",
        },
        {
          name: "email",
          label: "Business email",
          type: "email",
          autoComplete: "email",
        },
        { name: "employeeName", label: "Employee full name" },
        { name: "employeeId", label: "Employee ID", required: false },
        {
          name: "purpose",
          label: "Purpose and scope of verification",
          wide: true,
          multiline: true,
          placeholder: "Explain what you need verified and why.",
        },
      ]}
    />
  );
}
