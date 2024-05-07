import { Category } from "app/types";

export function findCategoryById(
  categories: Category[],
  categoryId: string
): Category | null {
  for (let category of categories) {
    if (category.id === categoryId) {
      return category;
    }
    if (category.children) {
      const found = findCategoryById(category.children, categoryId);
      if (found) return found;
    }
  }
  return null; // Return null if the category is not found in any branch
}
