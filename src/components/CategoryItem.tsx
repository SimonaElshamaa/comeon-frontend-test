import type { Category } from "../types/category";

type CategoryItemProps = {
  onSelect: (value: number) => void;
  category: Category
  selectedCategoryId: number | null;
};

export function CategoryItem({
  onSelect,
  category,
  selectedCategoryId
}: CategoryItemProps) {
  return (
    <button
        className={`category-button ${
        selectedCategoryId === category.id ? "active" : ""
        }`}
        type="button"
        key={category.id}
        onClick={() => onSelect(category.id)}
    >
        {category.name}
    </button>
  );
}