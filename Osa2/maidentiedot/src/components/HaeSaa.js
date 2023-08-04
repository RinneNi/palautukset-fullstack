import axios from "axios";
import { useState, useEffect } from "react";


const HaeSaa = ({ siti }) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    const url2 = '&appid='
    const apiKey = process.env.REACT_APP_API_KEY
    console.log(apiKey)

    const [saa, setSaa] = useState(null)

    useEffect(() => {
        axios
            .get(`${url}${siti}${url2}${apiKey}`)
                .then(response => {
                    setSaa(response.data)
                })
    }, [siti])


    if (saa === null) {return(null)}

    const imgUrl = `https://openweathermap.org/img/wn/${saa.weather[0].icon}@2x.png`
    return ( 
        <div>
        <br /><br />
            Kaupungin { saa.name } sää.
        <br />
            { (saa.main.temp - 273.15).toFixed(1)} C Tuntuu kuin { (saa.main.feels_like -273.15).toFixed(1) } C
        <br />
            <img src={imgUrl} alt= 'Icon' />
            <br />
            Tuulee {saa.wind.speed} m/s
        </div>
     );
}
 
export default HaeSaa;