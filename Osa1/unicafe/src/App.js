import { useState } from 'react'

const Tilastot = (props) => {
  console.log(props)
  const arvostelut = props.arvostelut
  const hyvä = arvostelut.hyvä
  const huono = arvostelut.huono
  const neutraali = arvostelut.neutraali
  const Yhteensä = hyvä + huono + neutraali
  const Keskiarvo = (hyvä-huono) / Yhteensä
  const Positiivisia = hyvä/Yhteensä*100

  if (Yhteensä <= 0) {
    return  (
      <div>
        <p>Ei palautteita</p>
      </div>
    )
  }
  
  return (
      <table>
        <tr>
        <p>Hyvät</p>
        <td>{hyvä}</td>
        </tr>
        <tr>
          <p>Huonot</p>
          <td>{huono}</td>
        </tr>
        <tr>
          <p>Neutraalit</p>
          <td>{neutraali}</td>
        </tr>
        <tr>
          <p>Keskiarvo</p>
          <td>{Keskiarvo}</td>
        </tr>
        <tr>
          <p>Positiivisia</p>
          <td>{Positiivisia}</td>
        </tr>
      </table>
  )
}


const App = () => {
  const [arvostelut, setArvostelut] = useState({
    hyvä: 0, huono: 0, neutraali: 0
  })


  const handleHyväArvostelu = () => {
    const uusiArvostelu = {
      ...arvostelut,
      hyvä: arvostelut.hyvä + 1
    }
    setArvostelut(uusiArvostelu)
  }

  const handleHuonoArvostelu = () => {
    const uusiArvostelu = {
      ...arvostelut,
      huono: arvostelut.huono + 1
    }
    setArvostelut(uusiArvostelu)
  }

  const handleNeutraaliArvostelu = () => {
    const uusiArvostelu = {
      ...arvostelut,
      neutraali: arvostelut.neutraali + 1
    }
    setArvostelut(uusiArvostelu)
  }

  return (
    <div>
      <h1>Anna palautetta</h1>
      <button onClick={handleHyväArvostelu}>Hyvä</button>
      <button onClick={handleHuonoArvostelu}>Huono</button>
      <button onClick={handleNeutraaliArvostelu}>Neutraali</button>
      <h1>Statistiikka</h1>
      <Tilastot arvostelut = {arvostelut} />
    </div>
  )
}



export default App