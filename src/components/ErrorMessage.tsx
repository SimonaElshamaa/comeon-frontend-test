type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message,
  onRetry
}: ErrorMessageProps) {
  return (
      <div className="ui negative icon message" role="alert">

        <div className="content">

          <p>{message}</p>

          {onRetry && (
          <button
            type="button"
            className="ui black button"
            onClick={onRetry}
          >
            Try again
          </button>
              )}
        </div>
      </div>
  );
}