import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { countriesurl, citiesurl } from '../urls';
import WeatherComp from './weathercomp';
import LoadingSpinner from './loadercomp';


const cityname = React.createContext();
const countryname = React.createContext(); 


export default function CountryCity()
{


    const [countries,setCountries] = React.useState([]);
    const [country,setCountry] = React.useState('');
    const [city,setCity] = React.useState('');
    const [cities,setCities] = React.useState([]);
    const [countryiso,setCountryiso] = React.useState('');
    const [isLoading,setLoading] = React.useState(false)
    const [cityloading,setCityLoad] = React.useState(false)
 
        React.useEffect(()=>{
            
            if(country){
                const getCities = ()=>{
                   setCityLoad(true)
                    axios.post(citiesurl,
                        {
                        "country": `${country}`
                        }
                    )
                    .then((response)=>response.data)
                    .then(response=>{
                        setCities(response.data);
                        console.log(response.data);
                        setCityLoad(false)
                    })
                }
                getCities()
            }

            
        },[country]);
    

    React.useEffect(()=>{
        getCountries()
        
    },[]);

    const getCountries = ()=>{
        setLoading(true);
        axios.get(countriesurl)
        .then((response)=>response.data)
        .then(response=>{
            setCountries(response.data);
            console.log(response.data);
            setLoading(false)
        })
    }


    function setData(value)
    {
        setCity('');
        if(value!==null)
        setCountry(value.name);
        else
        setCountry('');
        if(value!==null)
        setCountryiso(value.Iso3);
        else
        setCountryiso('');
        
    }

    // function handleFocus()
    // {
    //     setCities([]);
    //     setCity('');
    // }

    return(
        <div className='container'>
            <countryname.Provider value={countryiso}>
                <cityname.Provider value={city}>
                
            <div className='field'>  
            {isLoading?<LoadingSpinner/>:<Autocomplete
                    onChange={(event, value) => {setData(value)}} 
                    // onFocus={(event)=>{handleFocus()}}
                    // isOptionEqualToValue={(option,value)=>{return option.name===value.name}}
                    loading
                    clearText='clear'
                    id="country-select-demo"
                    sx={{ width: 500 }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name} 
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Choose a country"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                />}
           
            
                
            </div>  
            
            <div className='field'>
            {country===''?<></>: cityloading? <LoadingSpinner />:<Autocomplete
                    onChange={(event, value) => {(value!==null) ? setCity(value):setCity('')}} 
                    inputValue={city}
                    id="city-select-demo"
                    // isOptionEqualToValue={(option,value)=>{return option===value}}
                    loading
                    sx={{ width: 500 }}
                    options={cities}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option} 
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Choose a city"
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        />
                    )}
                />}
               

                {city && country && <WeatherComp/>}
                   
                
            </div>
                </cityname.Provider>
            </countryname.Provider>
        </div>

        
    )
}

export {cityname, countryname}