import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../../components/Dashboard";
import { mockWeatherResponse } from "../mocks";

describe("Dashboard", () => {
  test("renders the summary and details component when weather data present", ({
    expect,
  }) => {
    render(<Dashboard weather={mockWeatherResponse} />);
    expect(screen.getByTestId("summary")).toBeInTheDocument();
    expect(screen.getByTestId("details")).toBeInTheDocument();
  });
});
