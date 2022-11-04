import { useEffect } from "react";

var d = new Date();
const Hourly = (props) => {
    const weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain : "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere : "wi-fog",
        Clear : "wi-day-sunny",
        Clouds: "wi-day-fog"            
       };

    function checkIcon(rangeId) {
            for (let index = 1; index < 24; index++) {
                switch (true) {
                    case rangeId >= 200 && rangeId <= 232:
                        return weatherIcon.Thunderstorm
                    case rangeId >= 300 && rangeId <= 321:
                        return weatherIcon.Drizzle
                    case rangeId >= 500 && rangeId <= 531:
                        return weatherIcon.Rain
                    case rangeId >= 600 && rangeId <= 622:
                        return weatherIcon.Snow
                    case rangeId >= 701 && rangeId <= 781:
                        return weatherIcon.Atmosphere
                    case rangeId == 800:
                        return weatherIcon.Clear
                    case rangeId >= 801 && rangeId <= 804:
                        return weatherIcon.Clouds;
                    default:
                        return weatherIcon.Clouds;
            }
        }
    }
  return (
    <div className="hourly">
    <h1 className="h1">Hourly Forecast</h1>
    <br></br>
    {
        props.hourly.map((hour, index) => {
           return( <div className="row">
                <h2 className="left h2">{new Date(hour.dt * 1000).getHours() + ":00"}</h2>
                {
                    hour.weather ? <i className={"wi " + checkIcon(hour.weather[0].id) + " display-1 middle"}></i> : ''
                }
                {
                    hour.temp ? <h2 className="right h2">{Math.floor(hour.temp - 273.15)}&deg;</h2> : ''
                }
            </div>)
        })
    }
    

  
    <br></br>
    </div>
  )
}

export default Hourly