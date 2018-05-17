import React, {Component} from 'react';
import {Titles} from './components/titles';
import {Form} from './components/form';
import {Weather} from './components/weather';



const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
  //React 16 style, don't need constructor method. Can just declare initial state now.
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  //Weather AJAX call
  getWeather = async (e) => {
    //to prevent default behavior: refreshing the whole page
    e.preventDefault();
    try {
      //grabbing the user's input for city and country
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      //make API call here using fetch()
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      //converting results (our data) it into json format (easier to see and use)
      const data = await api_call.json();

      //if city and country result data are true (to fix the part where the user only enters the city and not country)
      if(city && country) {
        console.log(data);
        //changing the states
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
        //if user didn't enter "country" or it is undefined then we give them an error
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the value."
        });
      }
    }
    catch (e) {
      console.log('Error!', e);
    }
  }
  render() {
    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-5 title-container'>
                  <Titles />
                </div>
                <div className='col-xs-7 form-container'>
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// //before the component renders
// componentWillMount() {
//   API.get('example.com/api/users').then((data) => {
//     this.setState({users: data});
//   })
// }

// //after the component renders
// componentDidMount() {
//   var button = document.getElementById('button')
// }

// //called when the props provided to the component are changed
// componentWillReceiveProps(nextProps) {
//   if(this.props.userId != nextProps.userId){
//     //make a new api call
//   }
// }

// //called when the props and/or state change
// componentWillUpdate(nextProps, nextState){
//   console.log('updating...');
//   console.log(nextState.text);
//   //nextState is our new value, changes this.state
// }

// //called when the component is removed
// //this happens under the hood of redux --> cleaning up after itself
// componentWillUnmount(){
//   //i.e. stopping an event listener or something
// }
