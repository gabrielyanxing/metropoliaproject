import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react'

interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    condition: string;
    wind_speed: number;
    weather_story: string;
}

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if ('error' in data) {
                    throw new Error(data.error);
                }
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return (
            <div className="w-48 bg-black/80 p-3 rounded-lg unifont-text mt-4 shadow-md">
                <h2 className="text-white font-bold mb-2 text-lg flex items-center">
                    <Cloud className="w-6 h-6 mr-2" />
                    WEATHER
                </h2>
                <div className="text-red-500 text-sm">Error: {error}</div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="w-48 bg-black/80 p-3 rounded-lg unifont-text mt-4 shadow-md">
                <h2 className="text-white font-bold mb-2 text-lg flex items-center">
                    <Cloud className="w-6 h-6 mr-2" />
                    WEATHER
                </h2>
                <div className="text-white text-sm">Loading weather...</div>
            </div>
        );
    }

    return (
        <div className="w-48 bg-black/80 p-3 rounded-lg unifont-text mt-4 shadow-md">
            <h2 className="text-white font-bold mb-2 text-lg flex items-center">
                <Cloud className="w-6 h-6 mr-2" />
                WEATHER
            </h2>
            <div className="text-white text-sm space-y-2">
                <p>City: {weather.city}</p>
                <p>Temperature: {weather.temperature.toFixed(1)}°C</p>
                <p>Humidity: {weather.humidity.toFixed(1)}%</p>
                <p>Condition: {weather.condition}</p>
                <p>Wind Speed: {weather.wind_speed.toFixed(1)} km/h</p>
                <p className="text-xs">Story: {weather.weather_story}</p>
            </div>
        </div>
    );
};

export default Weather;

