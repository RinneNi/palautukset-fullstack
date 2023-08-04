const Person = ({ person, delPerson }) => {
    return ( 
        <p>
        {person.name} - {person.number}
        <button onClick={delPerson}>Poista</button>
        </p>
     );
}
 
export default Person;