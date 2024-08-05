import { Weather } from "../hooks/useWeather";
import Details from "./Details";
import Summary from "./Summary";

interface Props {
  weather: Weather
}

export default function Dashboard({ weather }: Props) {
  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto">
        <Summary
          name={weather.name}
          minTemp={weather.main.temp_min}
          maxTemp={weather.main.temp_max}
          currentTemp={weather.main.temp}
          description={weather.weather[0].description}
        />

      <div className="mt-14">
          <Details
            feelsLikeTemp={weather.main.feels_like}
            windSpeed={weather.wind.speed}
            humidity={weather.main.humidity}
            visibility={weather.visibility}
            sunrise={weather.sys.sunrise}
            sunset={weather.sys.sunset}
          />
      </div>
    </div>
  );
}
