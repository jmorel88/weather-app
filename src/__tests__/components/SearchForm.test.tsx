import { afterEach, describe, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "../../components/SearchForm";

const getWeatherByZipCodeMock = vi.fn();
const getWeatherByGeolocationMock = vi.fn();

describe("SearchForm", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("renders default correctly", ({ expect }) => {
    const { container } = render(
      <SearchForm
        error={null}
        loading={false}
        getWeatherByZipCode={getWeatherByZipCodeMock}
        getWeatherByGeolocation={getWeatherByGeolocationMock}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("on search, call getWeatherByZipCode", ({ expect }) => {
    render(
      <SearchForm
        error={null}
        loading={false}
        getWeatherByZipCode={getWeatherByZipCodeMock}
        getWeatherByGeolocation={getWeatherByGeolocationMock}
      />,
    );

    const input = screen.getByLabelText("Zip Code");
    const button = screen.getByRole("button", { name: "Submit zip code" });

    fireEvent.change(input, { target: { value: "10001" } });
    fireEvent.click(button);

    expect(getWeatherByZipCodeMock).toHaveBeenCalledWith("10001");
  });

  test("search by current location calls getWeatherByGeolocation", ({
    expect,
  }) => {
    render(
      <SearchForm
        error={null}
        loading={false}
        getWeatherByZipCode={getWeatherByZipCodeMock}
        getWeatherByGeolocation={getWeatherByGeolocationMock}
      />,
    );
    const button = screen.getByRole("button", { name: /search current location/i });

    fireEvent.click(button);

    expect(getWeatherByGeolocationMock).toHaveBeenCalled();
  });

  test("on error, display error message", ({ expect }) => {
    render(
      <SearchForm
        error={new Error("Error message")}
        loading={false}
        getWeatherByZipCode={getWeatherByZipCodeMock}
        getWeatherByGeolocation={getWeatherByGeolocationMock}
      />,
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("on loading, buttons are disabled", ({ expect }) => {
    render(
      <SearchForm
        error={null}
        loading={true}
        getWeatherByZipCode={getWeatherByZipCodeMock}
        getWeatherByGeolocation={getWeatherByGeolocationMock}
      />,
    );

    const zipcodeButton = screen.getByRole("button", { name: "Submit zip code" });
    const geolocationButton = screen.getByRole("button", { name: /search current location/i });

    expect(zipcodeButton).toBeDisabled();
    expect(geolocationButton).toBeDisabled();

  });
});
