import { useState } from "react";

import { findCategoryById } from "app/utils/findCategoryById";
import { Category } from "app/types";

function Selected({
  categories,
  onSelect,
}: {
  categories: Category[];
  onSelect: () => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const getAllChildIds = (category: Category, ids: string[] = []) => {
    ids.push(category.id);
    category.children?.forEach((child) => getAllChildIds(child, ids));
    return ids;
  };

  const selectAllCategories = () => {
    const allCategoryIds = categories.map((category) => category.id);
    setSelectedCategories(allCategoryIds);
    onSelect();
  };

  return (
    <div>
      <h2>Selected Categories</h2>
      <ul>
        {selectedCategories.map((categoryId) => (
          <li key={categoryId}>
            {findCategoryById(categories, String(categoryId))?.name}
          </li>
        ))}
      </ul>
      <button onClick={selectAllCategories}>Select All</button>
    </div>
  );
}

export default Selected;
