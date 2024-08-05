import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import Summary from "../../components/Summary";
import { mockWeatherResponse as weather } from "../mocks";

describe("Summary", () => {
  test("renders correctly", ({ expect }) => {
    const { container } = render(
      <Summary
        name={weather.name}
        minTemp={weather.main.temp_min}
        maxTemp={weather.main.temp_max}
        currentTemp={weather.main.temp}
        description={weather.weather[0].description}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
