import { Category } from "app/types";
import { findCategoryById } from "./findCategoryById";

export function getAllChildCategoryIds(
  categories: Category[],
  categoryId: string
) {
  let childIds: string[] = [];
  const category = findCategoryById(categories, categoryId);

  if (category && category.children) {
    childIds = childIds.concat(category.children.map((cat) => cat.id));
    category.children.forEach((cat) => {
      childIds = childIds.concat(getAllChildCategoryIds(categories, cat.id));
    });
  }

  return childIds;
}
