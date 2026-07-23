import "./styleSheet.css";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-area">
      <label className="sr-only" htmlFor="game-search">
        Search games
      </label>
      <div className="ui fluid icon input">
        <input
          id="game-search"
          type="search"
          placeholder="Search Game"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <i className="search icon" />
      </div>
    </div>
  );
}