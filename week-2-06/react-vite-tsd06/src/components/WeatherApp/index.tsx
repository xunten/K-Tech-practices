import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";

const API_KEY = "c9a0ca46550648b29ce125849232709";

interface WeatherData {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    wind_kph: number;
}

interface HourlyData {
    time: string;
    temp_c: number;
    condition: { text: string; icon: string };
}

export default function WeatherApp() {
    const [city, setCity] = useState("Hanoi");
    const [input, setInput] = useState("Hanoi");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [hourly, setHourly] = useState<HourlyData[]>([]);

    useEffect(() => {
        async function fetchWeather() {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no&lang=vi`
            );
            const data = await res.json();
            setWeather({
                temp_c: data.current.temp_c,
                condition: data.current.condition,
                humidity: data.current.humidity,
                wind_kph: data.current.wind_kph,
            });
        }
        async function fetchHourly() {
            const res = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no&lang=vi`
            );
            const data = await res.json();
            setHourly(
                data.forecast.forecastday[0].hour.map((h: any) => ({
                    time: h.time.slice(-5),
                    temp_c: h.temp_c,
                    condition: h.condition,
                }))
            );
        }
        fetchWeather();
        fetchHourly();
    }, [city]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCity(input);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl px-6 py-8 bg-gradient-to-b from-[#8cbde3] to-[#CEDCE7]">
                <TopBar input={input} setInput={setInput} onSearch={handleSearch} />
                <CurrentWeather weather={weather} />
                <HourlyForecast hourly={hourly} />
            </div>
        </div>
    );
}