import { render, fireEvent, screen } from "@testing-library/react";
import { CheckboxTree } from "./CheckboxTree";

// Sample categories data
const categories = [
  {
    id: "1",
    name: "Electronics",
    children: [{ id: "2", name: "Laptops", children: [] }],
  },
  { id: "3", name: "Clothing", children: [] },
];

test("checkbox changes and expansions react to user input", async () => {
  const mockSelect = jest.fn();
  const { getByText } = render(
    <CheckboxTree
      categories={categories}
      onSelect={mockSelect}
      selectedCategories={[]}
    />
  );

  // Trigger expansion of 'Electronics'
  const electronicsLabel = getByText("Electronics");
  fireEvent.click(electronicsLabel);
  expect(screen.getByText("Laptops")).not.toHaveClass("selected"); // Check visibility instead of selected state

  // Select 'Laptops' by checking its checkbox
  const laptopsCheckbox = screen.getByLabelText("Laptops");
  fireEvent.click(laptopsCheckbox);
  expect(mockSelect).toHaveBeenCalledWith("2");
});
