// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';


// function App() {

//   const [ pokemon, setPokemon] = useState({}) ;

//   useEffect(() => {
//     axios.get ('https://pokeapi.co/api/v2/pokemon/4/ ')
//     .then(res => setPokemon(res.data));
//   },  [ ] ) 
// console.log(pokemon.sprites?.other)
// return (
//   <div className= "app">
//     <h1>{pokemon.name}</h1> 
//     <img src = {pokemon.sprites?.other.dream_world.front_default}></img>   
//     <ul>
//       <li><b>Weigth : {pokemon.weight}</b>    </li>
//       <li><b>Heigth : {pokemon.height}</b>    </li>
//     </ul>
//     </div>   

//   );
// };

// export default App

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

    const [ data, setData] = useState (null)
    const [ boton, setBoton] = useState (true)


useEffect  ( () => { 
 const handleError = () => {
   alert ("No permitio  acceder a la ubicacion " )
 }

 const success = position => {
   const lat = position.coords.latitude
   const lon = position.coords.longitude
   axios.get (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cbde07d445d6829733e06caef2ccd8e8`)
      .then( res => {
        setData (res.data)
        console.log (res.data)
      });
 }


 navigator.geolocation.getCurrentPosition( success, handleError)
},[]);

// funciones que  cambian  grados  kelvin a las temperaturas deseadas 
 const changeTemperature = () => setBoton(!boton)
 const kelvinCelsius = (data ) => data = parseFloat(data-273.15).toFixed(2)
 const kelvinFahrenheit = (data) => data = parseFloat((data-273.15) * 1.8  + 32).toFixed(2)

 //variables que  cambian las unidades 
 let mainTemp =  data?.main.temp
 let max = data?.main.temp_max
 let min = data?.main.temp_min

 return (
 <div className= "app">
   <i className="fas fa-cloud-sun fa-4x"></i>
   <h1 className='title'>Wheather App</h1><br></br>
   <li className='location'><b>location :{data?.name} </b></li><br></br>
 

              <div className='card'>
                    <h3 className='title2'><b>"scattered clouds"</b></h3><br></br>
                    <li className='wind speed'><i className="fas fa-wind"></i><b>    wind speed : {data?.wind.speed} </b></li><br></br>
                    <li className='clouds'><i className="fas fa-cloud"></i><b>  clouds: {data?.clouds.all}   </b></li><br></br>
                        <li className='pressure'><i className="fas fa-temperature-high"></i><b>pressure :{data?.main.pressure} </b></li> <br></br>
                  </div>

                
      
<button className='degrees' onClick={changeTemperature}><b>Degrees °F/°C</b></button> 

{/* //estas son las funciones  ternarias para cnovertir las unidades por medio de las variables */}

<b><span className='temperature'>
  {
    boton ? kelvinCelsius (mainTemp) : kelvinFahrenheit (mainTemp)

  }
  <span className='grades'>{boton ? "C°" : "F°"}</span>
</span></b>

<b><span className='temp_max'>

  {
    boton ? kelvinCelsius (max) : kelvinFahrenheit (max)

  }
  
  <span className='temperaturemax'>{boton ? "C°" : "F°"}</span>
</span></b>
<li className='tempmax'><b>TMax  </b></li>

<b><span className='temp_min'>

  {
    boton ? kelvinCelsius (min) : kelvinFahrenheit (min)

  }
  
  <span className='temperaturemax'>{boton ? "C°" : "F°"}</span>
</span></b>
<li className='tempmin'><b>TMin  </b></li>
</div>   

  );
 };

 export default App
