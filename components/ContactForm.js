import { useRouter } from "next/router";
import RequestForm from "./RequestForm";
import { services } from "../data/services";
export default function ContactForm() {
  const router = useRouter();
  const selected = services.find((s) => s.slug === router.query.service);
  const region =
    typeof router.query.region === "string"
      ? router.query.region.slice(0, 80)
      : "";
  return (
    <RequestForm
      kind="contact"
      submitLabel="Send business enquiry"
      initialValues={{
        service: selected?.slug || "",
        message: region
          ? `I would like to discuss coverage for ${region}.`
          : "",
      }}
      fields={[
        { name: "name", label: "Full name", autoComplete: "name" },
        {
          name: "email",
          label: "Work email",
          type: "email",
          autoComplete: "email",
        },
        { name: "company", label: "Company", autoComplete: "organization" },
        { name: "country", label: "Country", autoComplete: "country-name" },
        {
          name: "service",
          label: "Service of interest",
          wide: true,
          options: [
            ...services.map((s) => ({ value: s.slug, label: s.title })),
            { value: "other", label: "Help me choose" },
          ],
        },
        {
          name: "message",
          label: "What would you like to improve?",
          wide: true,
          multiline: true,
          placeholder:
            "Tell us about your process, channels, volumes or timeline.",
        },
      ]}
    />
  );
}
