import './App.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result);

        },
        (error) => {

        }
      )
  }, []);


  const [query, setQuery] = useState({ q: 'berlin' })
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, ...units }).then((data) => {
        setWeather(data);
      })

    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700 ";
    const treshold = units === "metric" ? 20 : 60;
    if (weather.temp <= treshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700 ";
  }

  const formatClothes = () => {
    if (!weather) return "/images/t-shirt_shorts.png";

    if (weather.temp > 20) {
      return "/images/t-shirt_shorts.png";
    } else if (weather.temp > 15) {
      return "/images/sportswear.png";
    } else if (weather.temp > 5) {
      return "/images/jacket.png";
    } else if (weather.temp > 0) {
      return "/images/down_jacket.png"
    } else if (weather.temp < 0) {
      return "/images/eskimos.png"
    } else {
      return "/images/t-shirt_shorts.png";
    }
  }


  return (
    <div className={`mx-auto max-w-screen-md mt4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      <img src={`${formatClothes()}`}
        alt=""
        className='w-20 m-auto'
      />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title='hourly forecast' items={weather.hourly} />
          <Forecast title='daily forecast' items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
