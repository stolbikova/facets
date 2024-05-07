import { useState } from "react";

import CheckboxTree from "app/components/CheckboxTree";
import { buildCategoryTree } from "app/utils/buildCategoryTree";
import { findCategoryById } from "app/utils/findCategoryById";
import { Category } from "app/types";
import response from "app/mocks/response";
import Selected from "app/components/Selected";

import styles from "./index.module.css";

// Get all IDs from the entire category tree
const getAllCategoryIds = (categories: Category[]) => {
  let ids: string[] = [];
  categories.forEach((category) => {
    ids.push(category.id);
    if (category.children) {
      ids = ids.concat(getAllCategoryIds(category.children));
    }
  });
  return ids;
};

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = buildCategoryTree(response.data.categories);

  // Determine if all categories are selected
  const areAllSelected = () => {
    const allIds = getAllCategoryIds(categories);
    return allIds.every((id) => selectedCategories.includes(id));
  };

  // Handle clicking the "Select All" or "Deselect All" button
  const handleSelectAllToggle = () => {
    if (areAllSelected()) {
      setSelectedCategories([]); // Deselect all
    } else {
      setSelectedCategories(getAllCategoryIds(categories)); // Select all
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    const category = findCategoryById(categories, String(categoryId));
    if (!category) return;

    setSelectedCategories((prevSelected) => {
      const selectedSet = new Set(prevSelected);

      let allChildIds = category.children
        ? getAllCategoryIds([category])
        : [categoryId];
      const allSelected = allChildIds.every((id) => selectedSet.has(id));

      allChildIds.forEach((id) => {
        if (allSelected) {
          selectedSet.delete(id);
        } else {
          selectedSet.add(id);
        }
      });

      return Array.from(selectedSet);
    });
  };

  return (
    <div className={styles.appContainer}>
      <button
        className={styles.selectAllButton}
        onClick={handleSelectAllToggle}
      >
        {areAllSelected() ? "Deselect All" : "Select All"}
      </button>
      <div className={styles.wrapContainer}>
        <CheckboxTree
          categories={categories}
          onSelect={handleCategorySelect}
          selectedCategories={selectedCategories}
        />
        <Selected
          categories={categories.filter((cat) =>
            selectedCategories.includes(cat.id)
          )}
          selectedCategoryIds={selectedCategories}
        />
      </div>
    </div>
  );
}

export default App;
