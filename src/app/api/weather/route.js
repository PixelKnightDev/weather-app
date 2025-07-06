export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')

    if(!city) {
        return Response.json({error: 'city name is required'}, { status: 400})
    }
    try {
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        )
        const geoData = await geoResponse.json()
        console.log(geoData);

        if(!geoData.results || geoData.results.length === 0) {
            return Response.json({ error: 'City not found '}, { status: 404 })
        }

        const { latitude, longitude, name, country } = geoData.results[0]
        
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m&timezone=auto`
        )
        const weatherData = await weatherResponse.json()

        const formattedData = {
            name: `${name}, ${country}`,
            main: {
                temp: Math.round(weatherData.current_weather.temperature),
                humidity: weatherData.hourly.relative_humidity_2m[0]
            },
            weather: [{
                description: getweatherDescription(weatherData.current_weather.weathercode)
            }],
            wind: {
                speed: weatherData.current_weather.windspeed
            }
        }

        return Response.json(formattedData)
    } catch (error) {
        console.log(error);
    }
}

function getweatherDescription(code) {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  }
  return weatherCodes[code] || 'unkown weather'
}