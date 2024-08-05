import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import DashboardSkeleton from "../../components/DashboardSkeleton";

describe("Summary", () => {
  test("renders correctly", ({ expect }) => {
    const { container } = render(<DashboardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
