import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import comsService from './services/coms'
import Person from './components/Person'
import axios from 'axios'
import Notification from './components/Notification'
import './index.css'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [persons, setPersons] = useState([])
  //newName&newNumber arvojen kotrolointiin  1/2
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //Filter
  const [showAll, setShowAll] = useState(false)
  const [newFilter, setNewFilter] = useState('')
  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  //handleNoteChange kentän arvon lukemiseen ja päivittämiseen  2/2
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // isAlready nimen tarkastukseen (onko jo)
  const isAlready = persons.some(person => person.name === newName)

  // Datan haku json serveriltä
  useEffect(() => {
    comsService
      .getAll()
        .then(Response => {
          setPersons(Response)
      })
  }, [])


  // addName nimen lisäykseen
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (isAlready) {
      const korvataan = window.confirm(`${newName} löytyy jo luettelosta ! Haluatko korvata vanhan numeron uudella?`)

        if (korvataan) {
          console.log('muutetaan nimeä')
          const kuka = persons.find(person => person.name === newName)
          
          comsService
            .update(kuka.id, nameObject)
              .then(response => {
                setPersons(persons.map(person => person.id !== kuka.id ? person : response))
                setNewName('')
                setNewNumber('')
                setSuccessMessage(
                  `${kuka.name} uusi numero: ${kuka.number}`
                )
                setTimeout(() => {
                  setSuccessMessage(null)
                }, 5000)
              })
              .catch(error => {
                setErrorMessage(`${error.message} ${kuka.name} ei lyödy enää puhelinluettelosta.`)
                setPersons(persons.filter(person => person.id !== kuka.id))
                setNewName('')
                setNewNumber('')
              })
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
        }

    } else {

      comsService
        .create(nameObject)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(
              `${response.name} lisätty puhelinluetteloon.`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
    }
  }

  const delPersonID = (id) => {
    const kukaLahtee = persons.find(n => n.id === id)
    const url = `http://localhost:3001/persons/${id}`

    const varmasti = window.confirm(`Poistetaanko ${kukaLahtee.name}?`)

    if (varmasti) {
    axios
      .delete(url)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          setErrorMessage(`virhe`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }}

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <AddPerson
        addName={addName}
        newName={newName}
        handleNoteChange={handleNoteChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
        <Filter
        handleFilterChange={handleFilterChange}
        newFilter={newFilter}
      />
      <h2>Numerot</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          delPerson={() => delPersonID(person.id)} />
        ))}
    </div>

  );
}

export default App