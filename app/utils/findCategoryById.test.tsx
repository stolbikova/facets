import { findCategoryById } from "./findCategoryById";
import { Category } from "app/types"; // Ensure the Category type is correctly imported

describe("findCategoryById", () => {
  const categories: Category[] = [
    {
      id: "1",
      name: "Electronics",
      parent: "0",
      children: [
        {
          id: "2",
          name: "Computers",
          parent: "1",
          children: [{ id: "3", name: "Laptops", parent: "2", children: [] }],
        },
      ],
    },
    { id: "4", name: "Clothing", parent: "0", children: [] },
  ];

  it("finds a category by ID in a simple list", () => {
    const result = findCategoryById(categories, "4");
    expect(result).toEqual({
      id: "4",
      name: "Clothing",
      parent: "0",
      children: [],
    });
  });

  it("finds a category by ID in a nested structure", () => {
    const result = findCategoryById(categories, "3");
    expect(result).toEqual({
      id: "3",
      name: "Laptops",
      parent: "2",
      children: [],
    });
  });

  it("returns null when the category does not exist", () => {
    const result = findCategoryById(categories, "5"); // Assuming '5' is a non-existent ID
    expect(result).toBeNull();
  });

  it("returns null when the category list is empty", () => {
    const result = findCategoryById([], "1");
    expect(result).toBeNull();
  });
});
