type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({
  message
}: ErrorMessageProps) {
  return (
    <section className="games-feedback">
    <div className="ui negative icon message" role="alert">
      <i
        className="warning sign icon"
        aria-hidden="true"
      />

      <div className="content">
        <div className="header">
          We couldn&apos;t load the games
        </div>

        <p>{message}</p>
      </div>
    </div>
  </section>
  );
}