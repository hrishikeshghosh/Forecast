import dotenv from "dotenv";
import React, { useEffect, useState } from "react";
import Forecast from "./forecast";

dotenv.config();
const TempApp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Kolkata");

  const BackgroundDecider=(desc)=>{

    document.body.setAttribute('class', desc);

    if(desc!=='default'){
      return desc
    }else{
      return 'No Data Found'
    }

  }

  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${search}&days=3&aqi=no&alerts=no`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.forecast);



    };
    fetchApi();
  }, [search]);

  return (

    <>
      <div className="header">
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            placeholder="Search City"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>
      <div className='box' >
     
        {!city ? (
          
        BackgroundDecider('default')
        
        ) : (
          <div className={`container ${BackgroundDecider(city.forecastday[0].day.condition.text)}`}>
            <div className="left-panel">
              <div className="left-panel-child">
                <h2 className="temp">

                
                  {city.forecastday[0].day.avgtemp_c}°C
                </h2>
                <h1 className="location">{search}</h1>
                <div className="description-box">
                  <img
                    className="icon"
                    src={city.forecastday[0].day.condition.icon}
                    alt=""
                  />
                  <p className='desc-text'>{city.forecastday[0].day.condition.text}</p>
                </div>
              </div>
            </div>
            <div className="right-panel">
              <div className="info">
                <h2 style={{fontSize:'2vw'}}>Informations</h2>
                <div className="humidty">
                  <h3 className="Humidty">HUMIDITY:</h3>
                  <h3> {city.forecastday[0].day.avghumidity} </h3>
                </div>
                <div className="pressure">
                  <h3>PRESSURE:</h3>
                  <h3> {city.forecastday[0].day.totalprecip_mm} mm</h3>
                </div>
                <div className="wind">
                  <h3>WIND:</h3>
                  <h3> {city.forecastday[0].day.maxwind_mph} MPH</h3>
                </div>
                <div className="maxtemp">
                  <h3>Max:</h3>
                  <h3> {city.forecastday[0].day.maxtemp_c} °Cel</h3>
                </div>
                <div className="mintemp">
                  <h3>Min:</h3>
                  <h3> {city.forecastday[0].day.mintemp_c} °Cel</h3>
                </div>
                <div className="border"></div>
              </div>

<div className='forecast-panel'>

{console.log(city)}
{city.forecastday.map((forecast)=>{
  return <Forecast
    date={forecast.date}
    max={forecast.day.maxtemp_c}
    min={forecast.day.mintemp_c}
    img={forecast.day.condition.icon}
    detail={forecast.day.condition.text}
  />
})}
</div>


              {/* <div className="forecast">
                <div className="day-one">
                  <h3 className='day-one-'>{city.forecastday[1].date}</h3>
                  <img src={city.forecastday[1].day.condition.icon} alt=''/>
                  <div className='maxmin'>
                    <h3>{city.forecastday[1].day.maxtemp_c}</h3>
                    <h4>{city.forecastday[1].day.mintemp_c}</h4>
                  </div>
                  <h3 className='day-one-condition'>{city.forecastday[1].day.condition.text}</h3>
                </div>
                <div className="day-two"></div>
                <div className="day-three"></div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { TempApp };
