export const documentTypes = [
  {
    id: "experience-letter",
    title: "Experience / relieving letter",
    audience: "Former employees",
    description:
      "Request a record of your employment or follow up on a relieving letter.",
    checklist: [
      "Name used during employment",
      "Employee ID, if available",
      "Joining and leaving dates, if known",
    ],
    note: "HR checks employment records and any applicable clearance requirements before issuing a letter.",
  },
  {
    id: "clearance",
    title: "Clearance status",
    audience: "Former employees",
    description: "Ask about your exit clearance and any outstanding steps.",
    checklist: [
      "Name used during employment",
      "Employee ID, if available",
      "Last working date and the step you need help with",
    ],
    note: "Include the department or clearance step involved. Do not upload financial account details.",
  },
  {
    id: "final-pay",
    title: "Final-pay query",
    audience: "Former employees",
    description:
      "Ask for clarification about a final-pay statement or pending review.",
    checklist: [
      "Name used during employment",
      "Employee ID, if available",
      "Relevant pay period and a brief explanation",
    ],
    note: "Describe the issue without bank details, tax IDs or payment-card information. HR will advise if more information is needed.",
  },
  {
    id: "employment-verification",
    title: "Employment verification",
    audience: "Authorised organisations",
    description:
      "Request an employment check with the employee’s authorisation.",
    checklist: [
      "Your organisation and work email",
      "Employee name and ID, if available",
      "Scope of the check",
      "Employee authorisation letter — PDF, up to 2 MB",
    ],
    note: "Mailbox verification is not proof of authority. HR independently reviews authorisation before sharing employment information.",
    attachmentRequired: true,
  },
  {
    id: "other",
    title: "Another employee request",
    audience: "Employees & former employees",
    description:
      "Tell the people team what you need and get the right next step.",
    checklist: [
      "Name used during employment",
      "Employee ID, if available",
      "A short explanation of the document or support needed",
    ],
    note: "Availability and eligibility depend on the request. HR confirms what can be provided.",
  },
];
export const documentStatuses = {
  received: "Received",
  under_review: "Under review",
  needs_information: "More information needed",
  completed: "Completed",
};
export const findDocumentType = (id) => documentTypes.find((t) => t.id === id);
