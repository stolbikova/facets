import { render, screen, waitFor } from "@testing-library/react";
import Selected from "app/components/Selected";

const categories = [
  { id: "1", name: "Electronics", parent: "0" },
  { id: "2", name: "Laptops", parent: "1" },
  { id: "3", name: "Clothing", parent: "0" },
];

test("renders categories with their parent names", async () => {
  render(<Selected categories={categories} selectedCategoryIds={["2", "3"]} />);

  await waitFor(() => {
    const listItem = screen.getByText(/Laptops/);
    expect(listItem).toBeInTheDocument();
    expect(listItem.textContent).toContain("Electronics > Laptops");

    const clothingItem = screen.getByText(/Clothing/);
    expect(clothingItem).toBeInTheDocument();
    expect(clothingItem.textContent).toBe("Clothing"); // No parent, so no arrow or extra text
  });
});
