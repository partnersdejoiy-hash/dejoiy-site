/* Inner-page opening: an open window onto the cosmos (camera station "wide"). */
export default function PageIntro({ title, description, children }) {
  return (
    <section className="page-intro" data-station="wide">
      <div className="wrap page-intro-inner">
        <h1 data-intro>{title}</h1>
        {description && <p data-intro>{description}</p>}
        {children}
      </div>
    </section>
  );
}
