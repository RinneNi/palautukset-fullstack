import { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";


const App = () => {
  const [maat, setMaat] = useState([])
  const [haku, setHaku] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setMaat(response.data.map(maa => maa.name.common))
        })
  }, [])

  const handleHakuChange = (event) => {
    setHaku(event.target.value)
  }


  return (
    <div className= 'main'>
      <h3>Etsi maan tietoja</h3>
      <input
        value={haku}
        onChange={handleHakuChange} />
        <Filter
          maat={maat}
          haku={haku}
          setHaku={setHaku} />
    </div>
  );
}

export default App;
