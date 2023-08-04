import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [lista, setLista] = useState(Array(8).fill(0))
  const [p, setP] = useState(0)
  const [paras, setParas] = useState('Yhtään anekdoottia ei ole vielä äänestetty')

  const handleClickSeuraava = () => {
    setSelected(Math.floor(Math.random()*8))

  }

  const handleClickAanesta = () => {
    const kopio = {...lista}
    kopio[selected] += 1
    if (kopio[selected] >= p) {
      setParas(anecdotes[selected])
      setP(kopio[selected])
    }
    setLista(kopio)

  }

  return (
    <div>
      <h2>Tässä päivän anekdootti</h2>
      <p>{anecdotes[selected]}</p>
      <Display selected={selected} lista={lista} />
      <button onClick={handleClickAanesta}>
        Äänestä
      </button>
      <button onClick={handleClickSeuraava}>
        Seuraava Anekdootti
      </button>
      <h3>Eniten ääniä saanut anekdootti on</h3>
      <p>{paras}</p>
    </div>
  )
}

const Display = ({selected, lista}) => {
return (
  <div>Äänet: {lista[selected]}</div>
)}


export default App
