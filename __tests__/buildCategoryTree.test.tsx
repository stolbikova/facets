import { buildCategoryTree } from "app/utils/buildCategoryTree";

describe("buildCategoryTree", () => {
  it("correctly builds a tree structure from a flat list of categories", () => {
    const categories = [
      { id: "1", name: "Electronics", parent: "0" },
      { id: "2", name: "Computers", parent: "1" },
      { id: "3", name: "Laptops", parent: "2" },
      { id: "4", name: "Clothing", parent: "0" },
    ];

    const expectedTree = [
      {
        id: "1",
        name: "Electronics",
        parent: "0",
        children: [
          {
            id: "2",
            name: "Computers",
            parent: "1",
            children: [
              {
                id: "3",
                name: "Laptops",
                parent: "2",
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "4",
        name: "Clothing",
        parent: "0",
        children: [],
      },
    ];

    const result = buildCategoryTree(categories);
    expect(result).toEqual(expectedTree);
  });
});
