import { useState } from "react";

interface Props {
  getWeatherByZipCode: (zipCode: string) => void;
  getWeatherByGeolocation: () => void;
  error: Error | null;
  loading: boolean;
}

function SearchIcon() {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}

export default function SearchForm({
  getWeatherByZipCode,
  getWeatherByGeolocation,
  loading,
  error,
}: Props) {
  const [zipCode, setZipCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    getWeatherByZipCode(zipCode);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
  };

  return (
    <form className="w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
      {error && <p className="text-red-700 text-xs mb-2">{error.message}</p>}

      <label className="text-white-800 text-xs mb-2 block" htmlFor="zipCode">
        Zip Code
      </label>

      <div className="relative mb-2">
        <input
          className="bg-black-200 text-white-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3"
          id="zipCode"
          onChange={handleOnChange}
          value={zipCode}
          name="zipCode"
          placeholder="Search city by zip code"
          type="text"
        />

        <button
          className="text-white-800 absolute h-full aspect-square flex items-center justify-center top-0 disabled:opacity-50"
          type="submit"
          disabled={loading}
          aria-label="Submit zip code"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="text-center md:flex md:justify-between w-full">
        <small className="text-xs text-gray-600 block">
          Format should be 5 digits (e.g. 10001)
        </small>
        <button
          className="text-xs text-blue-500 underline disabled:opacity-50"
          type="button"
          disabled={loading}
          onClick={getWeatherByGeolocation}
        >
          Search current location
        </button>
      </div>
    </form>
  );
}
