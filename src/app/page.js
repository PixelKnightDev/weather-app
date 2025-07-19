'use client'
import { useState } from 'react'
import SearchBox from './components/searchbox'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/weather?city=${cityName}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error)
      }
      
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ⛅ Weather Dashboard using open-meteo api
          </h1>
          <p className="text-blue-100 text-lg">
            Get current weather information for any city worldwide
          </p>
        </div>

        {/* Search Box */}
        <SearchBox onSearch={handleSearch} />
        
        {/* Loading State */}
        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
            <p className="text-white text-lg">Loading weather data...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Weather Data */}
        {weatherData && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with city name */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold text-center">{weatherData.name}</h2>
            </div>
            
            {/* Weather content */}
            <div className="p-6 space-y-4">
              {/* Temperature - Main highlight */}
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {weatherData.main.temp}°C
                </div>
                <p className="text-xl text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
              
              {/* Weather details grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">💧</div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">{weatherData.main.humidity}%</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">💨</div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-lg font-semibold">{weatherData.wind.speed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}