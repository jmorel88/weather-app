import { useEffect, useRef } from "react";

interface Props {
  forecast: {
    list: {
      temp: {
        min: number;
        max: number;
      };
    }[];
  };
}

export default function Forecast({ forecast }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // use chart.js to render the 5 day forecast
  }, [forecast])

  return (
    <section className="text-white-900 text-center md:text-left">
      <h2 className="text-2xl font-semibold mb-6">7 Day Weather Forecast</h2>
      <div className="p-4 md:p-8 bg-black-200 rounded-lg">
        <canvas ref={canvasRef} width="400" height="200" />
      </div>
    </section>
  );
}
