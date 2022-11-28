import React from 'react'
import './weather.css'
import { useState} from 'react'
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {MdLocationOn} from 'react-icons/md';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image from '../assets/iconimage.png'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow:'none'
  }));


function Weather() {

  const apiKey = "11752cd62aa1d12ac80e3fb3ced54fa5"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }


  return (
    <div>
        <h2 className='title'>Weather Today</h2>
        <Grid container item lg={11}>

      <div className='form'>     
        <Grid container spacing={0}>
          <Grid item xl={6} lg={6} sm={10}xs={11}>
              <Item>

                <TextField id="outlined-search"  
                  className='textfield' size="small"
                  label="Search your city" type="search" 
                  value={inputCity} onChange={handleChangeInput}/>
                <Button  type='button' onClick={handleSearch} variant="contained">Search</Button>
              
                  <h5 className="city"><MdLocationOn className='location-icon'/>{data?.name}</h5>
                  <h6 className="temp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
              </Item>
          </Grid>
          <Grid item lg={6}>
                <Item>
                    <img src={image} alt='' className='icon-img'/>
                </Item>
          </Grid> 
        </Grid>
      </div>
      </Grid>
    </div>
  )
}

export default Weather