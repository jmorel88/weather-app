import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import Details from "../../components/Details";
import { mockWeatherResponse as weather } from "../mocks";

describe("Details", () => {
  test("renders correctly", ({ expect }) => {
    const { container } = render(
      <Details
        feelsLikeTemp={weather.main.feels_like}
        windSpeed={weather.wind.speed}
        humidity={weather.main.humidity}
        visibility={weather.visibility}
        sunrise={weather.sys.sunrise}
        sunset={weather.sys.sunset}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
