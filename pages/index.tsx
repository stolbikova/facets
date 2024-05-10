import { useState } from "react";

import CheckboxTree from "app/components/CheckboxTree";
import { buildCategoryTree } from "app/utils/buildCategoryTree";
import { findCategoryById } from "app/utils/findCategoryById";
import { getAllChildCategoryIds } from "app/utils/getAllChildIds";
import { Category } from "app/types";
import response from "app/mocks/response";
import Selected from "app/components/Selected";
import Layout from "app/layout";

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
  const categories: Category[] = buildCategoryTree(response.data.categories);

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
    const category = findCategoryById(categories, categoryId);
    if (!category) return;

    setSelectedCategories((prevSelected) => {
      const selectedSet = new Set(prevSelected);

      // Determine if we're adding or removing the category
      const isCurrentlySelected = selectedSet.has(categoryId);

      // Fetch all child IDs
      const childIds = getAllChildCategoryIds(categories, categoryId);

      if (isCurrentlySelected) {
        // Remove the category and its children from selection
        selectedSet.delete(categoryId);
        childIds.forEach((id) => selectedSet.delete(id));
      } else {
        // Add the category and its children to selection
        selectedSet.add(categoryId);
        childIds.forEach((id) => selectedSet.add(id));
      }

      return Array.from(selectedSet);
    });
  };

  return (
    <Layout>
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
            categories={categories}
            selectedCategoryIds={selectedCategories}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
