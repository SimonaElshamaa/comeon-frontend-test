export function LoadingState() {
  return (
  <section
    role="status"
    aria-live="polite"
    aria-label="Loading games"
  >
    <div className="ui active centered inline text loader">
      Loading...
    </div>
  </section>);
}