import SectionHeading from "../components/SectionHeading";
import VerificationForm from "../components/VerificationForm";

export default function EmployeeVerificationPage() {
  return (
    <div className="section-wrap py-20">
      <SectionHeading
        eyebrow="Employee Background Verification"
        title="Verify past DEJOIY employees professionally"
        subtitle="Submit a request and the verification request will be sent to the DEJOIY team."
      />

      <div className="max-w-4xl">
        <VerificationForm />
      </div>
    </div>
  );
}