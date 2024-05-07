import { ChangeEvent, useState } from "react";

import { Category } from "app/types";
import Arrow from "app/icons/Arrow";

import styles from "./CheckboxTree.module.css";

interface CheckboxTreeProps {
  categories: Category[];
  onSelect: (categoryId: string) => void;
  selectedCategories: string[];
}

function CheckboxTree({
  categories,
  onSelect,
  selectedCategories,
}: CheckboxTreeProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (categoryId: string) => {
    setExpanded((prevState) => {
      // Toggle only the current category's expansion state
      const newState = { ...prevState };
      newState[categoryId] = !prevState[categoryId];
      return newState;
    });
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    categoryId: string
  ) => {
    event.stopPropagation(); // Stop event bubbling to prevent unwanted label clicks
    onSelect(categoryId); // Only toggle selection state
  };

  const handleToggleExpand = (event: React.MouseEvent, categoryId: string) => {
    event.stopPropagation(); // Prevent triggering checkbox changes
    toggleExpand(categoryId); // Only toggle expansion state
  };

  const renderCategory = (category: Category) => {
    const isSelected = selectedCategories.includes(category.id);
    const isExpanded = expanded[category.id];
    return (
      <div key={category.id} className={styles.categoryItem}>
        <input
          id={`checkbox-${category.id}`}
          className={styles.checkbox}
          type="checkbox"
          checked={isSelected}
          onChange={(event) => handleCheckboxChange(event, category.id)}
        />
        <label
          className={`${styles.label} ${isSelected ? styles.selected : ""}`}
          onClick={(event) => handleToggleExpand(event, category.id)}
          htmlFor={`checkbox-${category.id}`}
        >
          {category.name}
        </label>
        {category.children && category.children.length > 0 && (
          <span
            className={styles.arrowContainer}
            onClick={(event) => handleToggleExpand(event, category.id)}
          >
            <Arrow
              className={`${styles.arrow} ${isExpanded ? styles.up : ""}`}
            />
          </span>
        )}
        {isExpanded && category.children && (
          <div className={styles.childrenContainer}>
            {category.children.map(renderCategory)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.treeContainer}>{categories.map(renderCategory)}</div>
  );
}

export default CheckboxTree;
