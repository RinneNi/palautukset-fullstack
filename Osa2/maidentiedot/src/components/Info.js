import axios from "axios";
import { useState, useEffect } from "react";
import HaeSaa from "./HaeSaa";

const Info = ({ maa }) => {
    const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${maa}`
    const [tiedot, setTiedot] = useState([])

    useEffect(() => {
        axios
            .get(url)
                .then(response => {
                    setTiedot(response.data)
                })
    }, [])

    
    if (tiedot.length === 0) {
        return(null)
    }


    return (
        <div>
            <h1>{ tiedot.name.common }</h1>
            <p>
                Pääkaupunki: { tiedot.capital }
                <br />
                Alue: { tiedot.area }    
            </p>
            <h3>Kielet</h3>
            <ul>
                {Object.keys(tiedot.languages).map((key) => (
                    <li key={key}>
                        {tiedot.languages[key]}
                    </li>
                ))}
            </ul>
            <br /><br />
            <img src={tiedot.flags.png} alt="Lippu" />
            <br />
                    <HaeSaa 
                        siti={ tiedot.capital }/>
        </div>
    );
}
 
export default Info