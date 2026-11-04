export default function SectionHeading({ id, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-muted dark:text-muted-dark">{description}</p>
      ) : null}
    </div>
  );
}
