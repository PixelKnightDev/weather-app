import { useState } from 'react'

export default function SearchBox({ onSearch }) {
  const [cityName, setCityName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cityName.trim()) {
      onSearch(cityName.trim())
      setCityName('')
    }
  }

  return (
    <div className="max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input 
          type="text" 
          placeholder="Enter city name..."
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <button 
          type="submit"
          className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </form>
    </div>
  )
}