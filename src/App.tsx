import Dashboard from "./components/Dashboard";
import DashboardSkeleton from "./components/DashboardSkeleton";
import SearchForm from "./components/SearchForm";
import useWeather from "./hooks/useWeather";

function App() {
  const {
    error,
    loading,
    weather,
    getWeatherByZipCode,
    getWeatherByGeolocation,
  } = useWeather();

  return (
    <main className="min-h-screen p-8 md:p-16 bg-black-100">
      <div className="mb-16">
        <SearchForm
          getWeatherByGeolocation={getWeatherByGeolocation}
          getWeatherByZipCode={getWeatherByZipCode}
          error={error}
          loading={loading}
        />
      </div>

      {loading && !weather ? (
        <DashboardSkeleton />
      ) : (
        weather && <Dashboard weather={weather} />
      )}

      <details className="absolute left-6 top-6 bg-black-100">
        <summary className="text-white-900">Raw Weather Data</summary>
        <pre className="text-white-900">
          {JSON.stringify({ weather }, null, 2)}
        </pre>
      </details>
    </main>
  );
}

export default App;
