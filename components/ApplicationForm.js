import RequestForm from "./RequestForm";
export default function ApplicationForm({ role }) {
  return (
    <RequestForm
      key={role}
      kind="careers"
      submitLabel="Send application"
      initialValues={{ role }}
      attachment={{ label: "Your CV", required: false }}
      fields={[
        { name: "name", label: "Full name", autoComplete: "name" },
        {
          name: "email",
          label: "Email address",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "location",
          label: "Your location",
          autoComplete: "address-level2",
        },
        {
          name: "experience",
          label: "Relevant experience",
          placeholder: "For example: 2 years in customer support",
        },
        {
          name: "message",
          label: "Tell us about yourself",
          wide: true,
          multiline: true,
          placeholder:
            "What interests you about this role, and what would you bring to the team?",
        },
      ]}
    />
  );
}
