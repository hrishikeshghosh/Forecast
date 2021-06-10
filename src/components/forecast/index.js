import React from 'react'
import './styles.css'

function Forecast(props) {

    return (
        <div className='forecast'>
        <div className='forecast-container'>
        <h3 className='forecastDate'>{props.date}</h3>
            <div className='maxmin'>
             <h3 className='forecastmax'>{props.max} °C</h3>
                <h6 className='forecastmin'>{props.min} °C</h6>
            </div>
            <div className='forecast-condition'>
            <img className='forecase-image' src={props.img} alt=''/>
            <p className='forecast-text'>{props.detail}</p>
            </div>
        </div>


        </div>         

    )
}

export default Forecast
