import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { cityname, countryname, } from "./country_city_comp";
import { latlonurl,weatherurl } from "../urls";
import '../weatherdesign.css';
import LoadingSpinner from './loadercomp';

export default function WeatherComp(){

    const city = useContext(cityname);
    const country = useContext(countryname);

    const[latlon,setLatLon] = useState({"lat":'',"lon":''});
    const[temp,setTemp] = useState('');
    const [type,setType] = useState(''); 
    const [wind,setWind] = useState('');
    const [isLoading,setLoading] = useState(false);

    useEffect(()=>{

        if(city && country){

            const getLatLon = () =>{

                const url = latlonurl(country,city);
                axios.get(url)
                .then(response=>response.data)
                .then(response=>{
                    const lat = response[0].lat
                    const lon = response[0].lon
                    setLatLon({"lat":lat,"lon":lon});
                    //console.log(latlon)
                })
            }

            getLatLon();
        }
       

    },[city,country])

    useEffect(()=>{

        if(latlon.lat && latlon.lon){

            const getWeather = () =>{
                setLoading(true)
                const url = weatherurl(latlon.lat,latlon.lon);
                axios.get(url)
                .then(response=>response.data)
                .then(response=>{
                    console.log(response.main.temp)
                    setTemp(response.main.temp);
                    setType(response.weather[0].description);
                    setWind(response.wind.speed);
                    setLoading(false)
                })
            }

            getWeather();
        }
       

    },[latlon])

   

   

    
    

    return (

        <>
            {/* <h1>country is {country}</h1>
            <h1>city is {city} </h1>
            <h1>{latlon.lat} {latlon.lon}</h1> */}

            {/* weather car */}

            {latlon.lat==='' && latlon.lat==='' ? <div className="loader"><LoadingSpinner/></div>: isLoading?<div className="loader"><LoadingSpinner/></div>:<div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-4 col-sm-12 col-xs-12">
                    <div className="card p-4">
                        <div className="d-flex">
                        <h6 className="flex-grow-1 title">{country}, {city}</h6>
                        </div>
                        <div className="d-flex flex-column temp mt-5 mb-3">
                        <h1 className="mb-0 font-weight-bold" id="heading"> {temp}° C </h1> <span className="small grey">{type}</span>
                        </div>
                        <div className="d-flex">
                        <div className="temp-details flex-grow-1">
                            <p className="my-1"> <img src="https://i.imgur.com/B9kqOzp.png" height="17px" alt="" /> <span> {wind} km/h </span> </p>
                            {/* <p className="my-1"> <i className="fa fa-tint mr-2" aria-hidden="true" /> <span> 84% </span> </p>
                            <p className="my-1"> <img src="https://i.imgur.com/wGSJ8C5.png" height="17px" /> <span> 0.2h </span> </p> */}
                        </div>
                        {/* <div> <img src="https://img.icons8.com/emoji/96/000000/sun-emoji.png" width="100px" alt=""/> </div> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>}
            
            

            {/* weather card end */}


        </>
    )
}