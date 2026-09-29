export const insights = [
  {
    slug: "designing-customer-support",
    category: "Customer Experience",
    title: "Build a support operation customers can rely on",
    excerpt:
      "A practical guide to ownership, knowledge and quality across voice, chat and email.",
    image: "/insights/article-2.jpg",
    sections: [
      [
        "Start with the contact, not the channel",
        "List the reasons customers need help: delivery updates, product questions, returns or account access. Assign an owner to each journey and document when an agent can resolve a request and when it needs specialist review.",
      ],
      [
        "Give agents a usable source of truth",
        "A knowledge base should explain the next action, not simply repeat policy. Include examples, approval limits and exception paths. Review it whenever a policy changes, and let agents flag unclear guidance.",
      ],
      [
        "Balance speed with resolution quality",
        "Review customer satisfaction alongside first-contact resolution, repeat contacts and turnaround time. A shorter conversation is useful only when the customer’s problem is handled correctly. Agree definitions before comparing teams or reporting progress.",
      ],
      [
        "Improve with a small feedback loop",
        "Sample interactions, calibrate reviewers and discuss recurring causes of escalation. Turn those findings into coaching and process changes. Start with a scoped pilot so that the team can learn before expanding coverage.",
      ],
    ],
  },
  {
    slug: "human-in-the-loop-quality",
    category: "AI Operations",
    title: "Where human judgment belongs in an AI workflow",
    excerpt:
      "Define review gates, escalation rules and meaningful evaluation before scaling automation.",
    image: "/insights/article-1.jpg",
    sections: [
      [
        "Define the decision boundary",
        "Identify which actions can be automated and which require human review. Sensitive, ambiguous or irreversible decisions need a clear escalation path. Document who owns the final decision.",
      ],
      [
        "Make quality measurable",
        "Write an evaluation rubric with representative examples. Reviewers should be able to explain a rating using the same criteria. Compare disagreements to find gaps in the rubric instead of treating every disagreement as a reviewer mistake.",
      ],
      [
        "Treat exceptions as useful feedback",
        "Group recurring failures by cause: missing context, ambiguous instructions, weak source data or model behaviour. Feed those findings to the team responsible for the system and repeat evaluation after changes.",
      ],
      [
        "Plan access and handoffs",
        "Give reviewers only the information they need for the task. Establish approved tools, access permissions and retention requirements with the client before data enters the workflow.",
      ],
    ],
  },
  {
    slug: "trust-safety-review",
    category: "Trust & Safety",
    title: "Make policy review more consistent",
    excerpt:
      "A framework for clearer guidance, thoughtful escalation and reviewable decisions.",
    image: "/insights/article-3.jpg",
    sections: [
      [
        "Turn policy into a decision guide",
        "Break a policy into observable criteria, examples and counterexamples. Explain how context changes a decision and identify cases that need specialist input.",
      ],
      [
        "Build an escalation path",
        "Reviewers need a way to pause uncertain cases without improvising policy. Assign escalation owners and agree response expectations according to the impact and urgency of the case.",
      ],
      [
        "Calibrate regularly",
        "Ask reviewers to assess a shared sample, then discuss differences. Record the interpretation and update the guide. Appeals can reveal where guidance or training needs to improve.",
      ],
      [
        "Support the people doing the work",
        "Review work can involve difficult material. Plan training, access controls, rotation and support appropriate to the content and role. The delivery plan should address these needs before launch.",
      ],
    ],
  },
  {
    slug: "ecommerce-support-playbook",
    category: "Delivery Examples",
    title: "An eCommerce support launch, step by step",
    excerpt:
      "An illustrative delivery scenario covering order queries, returns and escalation handling.",
    image: "/industries/retail.jpg",
    illustrative: true,
    sections: [
      [
        "The challenge",
        "Consider a growing store receiving order-status, return and refund queries through separate channels. Customers repeat information, and agents spend time finding ownership. This is an illustrative scenario, not a reported DEJOIY client engagement.",
      ],
      [
        "The delivery approach",
        "Group incoming contacts by reason, map the order and return policies, and agree handoffs to logistics and finance. Prepare a shared knowledge base, then pilot the workflow with a defined group of agents.",
      ],
      [
        "The quality review",
        "Sample resolved and escalated contacts using the same scorecard. Check whether the answer was accurate, the next action was clear and the customer received consistent information. Feed recurring exceptions back into the playbook.",
      ],
      [
        "What success would measure",
        "Agree a baseline for repeat contacts, resolution time and quality before launch. Compare pilot results with that baseline and review the causes of change. No client outcomes or performance improvements are claimed in this example.",
      ],
    ],
  },
];
