const AddPerson = ({ addName, newName, handleNoteChange, newNumber, handleNumberChange }) => {
    return ( 
        <form onSubmit={addName}>
        <div>
          Nimi: <input
                  value={newName}
                  onChange={handleNoteChange}
                />
        </div>
        <div>
          Numero: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
     );
}
 
export default AddPerson;