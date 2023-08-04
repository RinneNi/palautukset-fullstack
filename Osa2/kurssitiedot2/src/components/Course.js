const Course = ({kurssit}) => {

  return (
    <div>
      {kurssit.map((kurssi) => (
        <Kurssi key={kurssi.id} kurssi={kurssi} />
      ))}

    </div>
  )
  }
 
    const Kurssi = ({kurssi}) => {
      return (
        <div>
          <h2>{kurssi.name}</h2>
            {kurssi.parts.map((part) => 
              <Harjoitukset key={part.id} nimi={part.name} harjoitukset={part.exercises} /> 
            )}
          <h3>Yhteensä {kurssi.parts.reduce((s, o) => s + o.exercises, 0)} harjoitusta</h3>
        </div>
      );
    };

    const Harjoitukset = ({nimi, harjoitukset}) => {
      return (
          <p>{nimi} {harjoitukset}</p>
      )
    }

export default Course