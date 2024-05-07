import { getAllChildCategoryIds } from "app/utils/getAllChildIds";
import { Category } from "app/types";

// Mock categories data
const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    children: [
      { id: "2", name: "Laptops" },
      { id: "3", name: "Cameras" },
    ],
  },
  { id: "2", name: "Laptops", children: [{ id: "4", name: "Ultrabooks" }] },
  { id: "3", name: "Cameras", children: [] },
  { id: "4", name: "Ultrabooks", children: [] },
];

// Mock findCategoryById function for the purpose of the test
jest.mock("../app/utils/findCategoryById", () => ({
  findCategoryById: jest.fn((categories, id) =>
    categories.find((cat: Category) => cat.id === id)
  ),
  getAllChildCategoryIds: jest.requireActual("../app/utils/getAllChildIds")
    .getAllChildCategoryIds,
}));

describe("getAllChildCategoryIds", () => {
  it("should return all child IDs including nested children for the Electronics category", () => {
    const result = getAllChildCategoryIds(categories, "1");
    expect(result).toEqual(expect.arrayContaining(["2", "3", "4"]));
    expect(result.length).toBe(3);
  });

  it("should return only direct child IDs for the Laptops category", () => {
    const result = getAllChildCategoryIds(categories, "2");
    expect(result).toEqual(expect.arrayContaining(["4"]));
    expect(result.length).toBe(1);
  });

  it("should return an empty array for the Cameras category", () => {
    const result = getAllChildCategoryIds(categories, "3");
    expect(result).toEqual([]);
  });

  it("should return an empty array for the Ultrabooks category", () => {
    const result = getAllChildCategoryIds(categories, "4");
    expect(result).toEqual([]);
  });
});
