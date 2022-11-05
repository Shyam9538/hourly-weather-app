import Header from './components/Header';
import Cover from './components/Cover';
import Hourly from './components/Hourly';
import "weather-icons/css/weather-icons.css";
import React from 'react';
import './index.css'



 
const apiKey="99b18679f80c7f3071e7cadc69fd777f";



//There is a class here with a constructor, where the variables are decalared and set to undefined.
class App extends React.Component{
    
    constructor(){
        super();
        this.state={
            city:undefined,
            country: undefined,
            icon:undefined,
            icon1:undefined,
            main:undefined,
            celcius:undefined,
            temp_max:undefined,
            temp_min:undefined,
            uv:undefined,
            cover:undefined,
            description:"",
            description2:"",
            description3:"",
            error:false,
            dt:undefined,
            city: "London",
            lat:undefined,
            lng:undefined,
            hourly:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        };
        
        
        this.onInputchange = this.onInputchange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
       
        
        // console.log(this.state)
        //     if (!typeof this.state.lat==="undefined"){
        //     this.getWeather2(this.state.lat, this.state.long);
        // }



        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain : "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere : "wi-fog",
            Clear : "wi-day-sunny",
            Clouds: "wi-day-fog"            
           };
        
        this.intensity = {
            Low: "Low",
            Medium: "Medium",
            High: "High",
            VeryHigh: "High",
            Unknown: "Unknown"
        }

   
    }

//This method here calls the getWeather method.
  componentDidMount(){
      this.getWeather();
      console.log(this.state)
  }

  //This method allows the state to be changed.
  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //This method call the getWeather method on the form submit.
  onSubmitForm() {
    console.log(this.state)
    this.getWeather();
  }

  
    
    //This method here allows for kelvin data provided by the API into celcius. 
    calCelsius(temp){
        let cell = Math.floor(temp - 273.15);
        return cell;
       }

    //This method here allow for the cloud cover data to be converted into text values like low medium and high using a switch and cases.
    cloudCover(cover){
        switch (true) {
            case cover >= 0 && cover < 33:
                this.setState({ description2: this.intensity.Low});
                break;
            case cover >= 33 && cover < 66:
                this.setState({ description2: this.intensity.Medium });
                break;
            case cover >= 66 && cover <= 100:
                this.setState({ description2: this.intensity.High });
                break;
            default:
                this.setState({description2: this.intensity.Unknown});
       }
    }

    //This method here allows for the UV intensity to be converted from a number into a value using a switch and case statements. 
    uvIntensity(uvIntense){
        switch (true) {
            case uvIntense >= 0 && uvIntense < 2:
                this.setState({ description3: this.intensity.Low});
                break;
            case uvIntense >= 2 && uvIntense <= 7:
                this.setState({ description3: this.intensity.Medium });
                break;
            case uvIntense >= 7 && uvIntense < 11:
                this.setState({ description3: this.intensity.High });
                break;
            case uvIntense > 11:
                this.setState({ description3: this.intensity.VeryHigh });
                break;
            default:
                this.setState({description3: this.intensity.Unknown});
       }
    }
       
    //This method here allows for the weather icon to be decided based on the rangeid of the method.
    get_WeatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({ icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: this.weatherIcon.Drizzle});
                break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({ icon: this.weatherIcon.Rain });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeId === 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icon: this.weatherIcon.Clouds});
                break;
            default:
                this.setState({icon: this.weatherIcon.Clouds});
        }
    }

    //These methods here allow for the calculations to be made, such as deciding which icon to display based on the id of the weather, or displaying the levels of cloud cover or uv.
    hourTemp(rangeId){
        for (let index = 1; index < 24; index++) {
            switch (true) {
                case rangeId >= 200 && rangeId <= 232:
                    return this.weatherIcon.Thunderstorm
                case rangeId >= 300 && rangeId <= 321:
                    return this.weatherIcon.Drizzle
                case rangeId >= 500 && rangeId <= 531:
                    return this.weatherIcon.Rain
                case rangeId >= 600 && rangeId <= 622:
                    return this.weatherIcon.Snow
                case rangeId >= 701 && rangeId <= 781:
                    return this.weatherIcon.Atmosphere
                case rangeId === 800:
                    return this.weatherIcon.Clear
                case rangeId >= 801 && rangeId <= 804:
                    return this.weatherIcon.Clouds;
                default:
                    return this.weatherIcon.Clouds;
            }
        }
    }


    //This method fetches the data from the API call cand then sets it to the variable in the constructor, which initialises it.
    getWeather=async(props)=>{
        const apiCall= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}`);
        const response= await apiCall.json().then((response)=>{
            this.setState({
                city : response.name,
                country: response.sys.country,
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                description: response.weather[0].description,
                lat:response.coord.lat,
                lng:response.coord.lon
                
                
               });
            this.getWeather2(response.coord.lat, response.coord.lon)
            this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

        })
        
            console.log("BLAH");
           console.log(this.state.lat)
           this.setState();
           
    };

    //This method fetches the data from the second API call and sets the value to the variable in the constructor, which initialises it.
    getWeather2=async(lat1, long1)=>{
        console.log(long1, lat1)

        const apiCall2= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${long1}&exclude=minutely,daily&appid=${apiKey}`);
        const response2= await apiCall2.json();
        console.log(this.response2)
        this.setState({
            hourly:response2.hourly.slice(0,24)
        });
        console.log(this.state)
           this.uvIntensity(response2.current.uvi)
           this.cloudCover(response2.current.clouds)
           this.hourTemp(response2.hourly[0].weather[0].id);
           
    };

    //The render here allows for the variables to be used in the other components, and this data is passed through these variables.
    render(){
        return(
            
            <div className='App'> 
            <form className='form1'>
             
            <h1 className='cityName h1 mainTitle'>Hourly Weather Forecast App</h1>
            <p className='cityName h1'><h1>Please enter a city below:</h1></p>
            <input className='input' type="text"
            name="city"
            value={this.state.city}
            onChange={this.onInputchange}
          />
      </form>
      <br></br>
      <button className='button2 btn btn-outline-light' onClick={() => {
          this.onSubmitForm();
          document.getElementById('middle').scrollIntoView(true)
        }} placeholder="Please enter a city">Submit</button>
      <script>
      
      

</script>  
      <h1 id="middle"></h1>
            <Header
            city={this.state.city} 
            country={this.state.country}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            weatherIcon={this.state.icon}
            />
            <Cover 
            uv={this.state.uv}
            description2={this.state.description2}
            description3={this.state.description3}
            cover={this.state.cover}
            />

            <Hourly
            hourly={this.state.hourly}
            weatherIcon={this.state.icon1}
            dt={this.state.dt}
            hourTemp={this.hourTemp}
            lat={this.state.lat}
            lng={this.state.lng}
            />
            
        </div> 
        );
    }
}


export default App;