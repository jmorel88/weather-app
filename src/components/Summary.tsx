interface Props {
  name: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  description: string;
}

export default function Summary({
  name,
  currentTemp,
  minTemp,
  maxTemp,
  description,
}: Props) {
  return (
    <section data-testid="summary" className="p-8 bg-black-200 rounded-lg text-white-900 text-center md:text-left">
      <h2 className="text-4xl font-semibold mb-6">{name}</h2>
      <div className="md:flex items-end justify-between">
        <p>
          <span className="text-7xl text-orange font-bold inline-block md:inline mb-4 md:mb-0">
            {Math.round(currentTemp)}&deg;
          </span>
          <span className="text-xl md:text-2xl block md:inline mb-4">
            {description}
          </span>
        </p>
        <p className="text-xl md:text-2xl">
          Low {Math.round(minTemp)}&deg;
          <span className="inline-block mx-2" /> High {Math.round(maxTemp)}&deg;
        </p>
      </div>
    </section>
  );
}
