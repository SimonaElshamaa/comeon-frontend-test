import type { Category } from "../../types/category";
import { CategoryItem } from "../CategoryItem";
import "./StyleSheet.css";

type CategoryListProps = {
  categories: Category[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
};

export function CategoryList({
    categories,
    selectedCategoryId,
    onSelectCategory,
}: CategoryListProps) {
  return (
    <aside className="categories-section">
        <h2 className="section-heading">Categories</h2>

        <div className="section-divider" />

        <nav
            className="category-navigation"
            aria-label="Game categories"
        >
            {categories.map((category) => (
            <CategoryItem 
                key={category.id}
                category={category}
                selectedCategoryId={selectedCategoryId}
                onSelect={onSelectCategory}
            />
            ))}
        </nav>
    </aside>
  );
}