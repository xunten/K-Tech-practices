import React from "react";

interface CurrentWeatherProps {
  weather: {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    wind_kph: number;
  } | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="text-center mb-6"> 
        <div className=" rounded-2xl px-6 py-8 flex flex-row items-center">
            <div className="flex-1 text-left">
                <div className="text-[64px] font-semibold text-white leading-none">{weather.temp_c}°</div>
                <div className="text-3xl font-medium text-white mt-2">{weather.condition.text}</div>
            </div>
            <img src={weather.condition.icon} alt="" className="w-30 h-30 text-white" />
        </div>

      <div className="flex justify-center gap-6 border border-[#d3e9f8] bg-[#cfe1ebb8] rounded-2xl py-3 mt-4 text-gray-600 text-sm">
        <div className="mr-12">
          <div className="text-xl text-gray-500">Humidity</div>
          <div className="text-2xl font-semibold text-black">{weather.humidity} <span className="text-lg">%</span></div>
        </div>
        <div className="w-px bg-gray-400 h-10 self-center"></div>
        <div className="ml-12">
          <div className="text-xl text-gray-500">Wind</div>
          <div className="text-2xl font-semibold text-black">{(weather.wind_kph / 3.6).toFixed(1)} <span className="text-lg">km/h</span></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
