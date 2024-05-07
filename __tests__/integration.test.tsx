import { render, fireEvent } from "@testing-library/react";

import App from "pages/index";

jest.mock("../app/components/CheckboxTree", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-checkbox-tree" />),
}));

jest.mock("../app/components/Selected", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-selected" />),
}));

// Mock the response data
jest.mock("../app/mocks/response", () => ({
  data: {
    categories: [
      { id: "1", name: "Electronics", parent: "0", children: [] },
      { id: "2", name: "Clothing", parent: "0", children: [] },
    ],
  },
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it("renders without crashing", () => {
    render(<App />);
  });

  it('toggles selection state when "Select All" button is clicked', () => {
    const { getByText } = render(<App />);
    const selectAllButton = getByText("Select All");
    fireEvent.click(selectAllButton);
    expect(selectAllButton.textContent).toBe("Deselect All"); // Expect button text to change
    fireEvent.click(selectAllButton);
    expect(selectAllButton.textContent).toBe("Select All"); // Expect button text to revert
  });

  it("displays selected categories in the Selected component", () => {
    render(<App />);
    expect(
      document.querySelector('[data-testid="mock-selected"]')
    ).toBeInTheDocument();
  });
});
