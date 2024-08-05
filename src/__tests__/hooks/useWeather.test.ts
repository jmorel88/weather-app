import { describe, test, vi } from "vitest";
import useWeather from "../../hooks/useWeather";
import { renderHook, waitFor } from "@testing-library/react";
import { mockWeatherResponse } from "../mocks";

describe("useWeather", () => {
  // General fetch mock
  const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => mockWeatherResponse,
  } as Response);

  // Geolocation mock
  const getCurrentPositionMock = vi.fn().mockImplementation((success) => {
    success({
      coords: {
        latitude: 100.0,
        longitude: -100.0,
      },
    });
  });

  vi.stubGlobal("navigator", {
    geolocation: {
      getCurrentPosition: getCurrentPositionMock,
    },
  });

  test("returns return default values on initial render", ({ expect }) => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.weather).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("throws an error if the fetch for weather fails", async ({ expect }) => {
    fetchSpy.mockRejectedValueOnce(new Error);
    const { result } = renderHook(() => useWeather());
    await waitFor(() => result.current.getWeatherByGeolocation());
    expect(result.current.error).toEqual(
      Error("Weather data could not be fetched"),
    );
  });

  describe("getWeatherByZipCode", () => {
    test("sets weather data zip code", async ({ expect }) => {
      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByZipCode("12345"));
      expect(result.current.weather).toEqual(mockWeatherResponse);
    });

    test("throws an error if zip code is empty", async ({ expect }) => {
      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByZipCode(""));
      expect(result.current.error).toEqual(Error("Zip code is required"));
    });

    test("throws an error if zip code is invalid", async ({ expect }) => {
      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByZipCode("NOTVALID"));
      expect(result.current.error).toEqual(Error("Invalid zip code"));
    });

    test("throws an error if the openweather API cannot find zipcode", async ({
      expect,
    }) => {
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({ cod: "404" }),
      } as Response);

      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByZipCode("11111"));
      expect(result.current.error).toEqual(
        Error("Coordinates could not be found"),
      );
    });
  });

  describe("getWeatherByGeolocation", () => {
    test("sets weather data by geolocation", async ({ expect }) => {
      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByGeolocation());
      expect(getCurrentPositionMock).toHaveBeenCalled();
      expect(result.current.weather).toEqual(mockWeatherResponse);
    });

    test("throws an error if geolocation is not supported", async ({
      expect,
    }) => {
      vi.unstubAllGlobals();
      const { result } = renderHook(() => useWeather());
      await waitFor(() => result.current.getWeatherByGeolocation());
      expect(result.current.error).toEqual(
        Error("Geolocation is not supported"),
      );
    });
  });
});
