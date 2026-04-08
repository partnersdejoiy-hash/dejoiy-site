export default function BackgroundFX() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="orb orb-1"
        style={{ top: "-180px", left: "-120px" }}
      />
      <div
        className="orb orb-2"
        style={{ top: "-80px", right: "-80px" }}
      />
      <div
        className="orb orb-3"
        style={{ bottom: "60px", left: "35%" }}
      />
      <div className="absolute inset-0 grid-lines opacity-100" />
    </div>
  );
}
