export interface Category {
  id: string;
  name: string;
  parent: string; // ID of the parent category, '0' if it is a root category
}

export function buildCategoryTree(categories: Category[]): Category[] {
  // Map to hold the categories by their ID for quick access
  const categoryMap: { [key: string]: Category & { children: Category[] } } =
    {};

  // First pass: Initialize each category with an empty children array
  categories.forEach((category) => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  // Root categories array
  const rootCategories: Category[] = [];

  // Second pass: Populate the children arrays and identify root categories
  categories.forEach((category) => {
    if (category.parent === "0") {
      rootCategories.push(categoryMap[category.id]);
    } else {
      // Ensure the parent exists in the map before pushing to its children array
      if (categoryMap[category.parent]) {
        categoryMap[category.parent].children.push(categoryMap[category.id]);
      }
    }
  });

  return rootCategories;
}
