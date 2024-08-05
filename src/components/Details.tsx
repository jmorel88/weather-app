import { formatTime } from "../utils/datetime";
interface Props {
  feelsLikeTemp: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  sunrise: number;
  sunset: number;
}

function DetailBox({ title, value }: { title: string; value: string }) {
  return (
    <li className=" text-center bg-black-100/50 p-4 md:p-6 rounded-lg">
      <h3 className="text-gray-500 text-lg mb-4">{title}</h3>
      <p className="text-xl">{value}</p>
    </li>
  );
}

export default function Details({
  feelsLikeTemp,
  windSpeed,
  humidity,
  visibility,
  sunrise,
  sunset,
}: Props) {
  return (
    <section data-testid="details" className="text-white-900 text-center md:text-left">
      <h2 className="text-2xl font-semibold mb-6">Weather Details</h2>
      <ul className="p-4 md:p-8 bg-black-200 rounded-lg grid grid-rows-3 md:grid-rows-2 grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
        <DetailBox title="Feels Like" value={`${Math.round(feelsLikeTemp)}°`} />
        <DetailBox title="Wind Speed" value={`${Math.round(windSpeed)}mph`} />
        <DetailBox title="Humidity" value={`${Math.round(humidity)}%`} />
        <DetailBox title="Visibility" value={`${visibility / 1000} Km`} />
        <DetailBox title="Sunrise" value={formatTime(sunrise)} />
        <DetailBox title="Sunset" value={formatTime(sunset)} />
      </ul>
    </section>
  );
}
