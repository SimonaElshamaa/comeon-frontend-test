export function LoadingState() {
  return (
  <section
    className="games-feedback"
    role="status"
    aria-live="polite"
    aria-label="Loading games"
  >
    <div className="ui active centered inline text loader">
      Loading games
    </div>
  </section>);
}