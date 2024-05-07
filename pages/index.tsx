import { useState } from "react";

import { CheckboxTree } from "app/components/CheckboxTree";
import { buildCategoryTree } from "app/utils/buildCategoryTree";
import { findCategoryById } from "app/utils/findCategoryById";
import { Category } from "app/types";
import response from "app/mocks/response";

import Selected from "app/components/Selected";

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = buildCategoryTree(response.data.categories);
  const getAllChildIds = (category: Category, ids: string[] = []) => {
    ids.push(category.id);
    category.children?.forEach((child) => getAllChildIds(child, ids));
    return ids;
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = findCategoryById(categories, String(categoryId));
    if (!category) return;

    setSelectedCategories((prevSelected) => {
      const selectedSet = new Set(prevSelected);

      // Handling for parent categories
      if (category.children) {
        let allChildIds = getAllChildIds(category);
        const allSelected = allChildIds.every((id) => selectedSet.has(id));

        // If any child is not selected, select them all. If all are selected, deselect them.
        allChildIds.forEach((id) => {
          if (allSelected) {
            selectedSet.delete(id);
          } else {
            selectedSet.add(id);
          }
        });
      } else {
        // Handling for child categories
        if (selectedSet.has(categoryId)) {
          selectedSet.delete(categoryId);
        } else {
          selectedSet.add(categoryId);
        }
      }

      return Array.from(selectedSet);
    });
  };

  return (
    <div>
      <CheckboxTree
        categories={categories}
        onSelect={handleCategorySelect}
        selectedCategories={selectedCategories}
      />
      <Selected categories={categories} onSelect={() => {}} />
    </div>
  );
}

export default App;
