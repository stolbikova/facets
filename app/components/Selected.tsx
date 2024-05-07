import React from "react";
import { findCategoryById } from "app/utils/findCategoryById";
import { Category } from "app/types";
import styles from "./Selected.module.css";

function Selected({
  categories,
  selectedCategoryIds,
}: {
  categories: Category[];
  selectedCategoryIds: string[];
}) {
  // Recursive function to fetch all parent names up to the root
  const getParentChain = (categoryId: string, chain: string[] = []): string => {
    const category = findCategoryById(categories, categoryId);
    if (category && category.parent !== "0") {
      let parent = category.parent
        ? findCategoryById(categories, category.parent)
        : null;
      if (parent) {
        chain.unshift(parent.name); // Prepend parent name to the chain
        return getParentChain(parent.id, chain); // Recurse up the tree
      }
    }
    return chain.join(" > "); // Return the joined chain
  };

  return (
    <div className={styles.selectedContainer}>
      <h2>Selected Categories</h2>
      <ul>
        {selectedCategoryIds.map((categoryId) => {
          const category = findCategoryById(categories, categoryId);
          if (category) {
            const parentChain = getParentChain(category.id);
            const fullCategoryName = [parentChain, category.name]
              .filter(Boolean)
              .join(" > ");
            return <li key={category.id}>{fullCategoryName}</li>;
          }
          return null;
        })}
      </ul>
    </div>
  );
}

export default Selected;
