import React from "react";

interface HourlyData {
  time: string;
  temp_c: number;
  condition: { text: string; icon: string };
}

interface HourlyForecastProps {
  hourly: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const nowHour = new Date().getHours();

  const sliced = hourly.slice(nowHour);
  const displayHours =
    sliced.length >= 12
      ? sliced
      : [...sliced, ...hourly.slice(0, 12 - sliced.length)];

  return (
    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm max-w-full overflow-hidden">
      <div className="text-left text-xl font-semibold text-gray-500 mb-2 px-1">Now</div>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory min-h-[110px]">
        {displayHours.map((h, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-gray-700 min-w-[80px] shrink-0 snap-start"
          >
            <img src={h.condition.icon} alt="" className="w-10 h-10 mb-1" />
            <span className="text-xl font-bold">{h.temp_c}°</span>
            <span className="text-sm mt-1">
              {idx === 0 ? "Now" : h.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
