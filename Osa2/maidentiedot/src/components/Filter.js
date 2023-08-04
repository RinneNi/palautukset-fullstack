import HaeSaa from './HaeSaa'
import Info from './Info'

const Filter = ({ maat, haku, setHaku }) => {
    
    const nayta = maat.filter(maa => maa.toLocaleLowerCase().includes(haku.toLocaleLowerCase()))

    if (nayta.length > 10) {
        return  (
            <div>
                <br />
                Liian monta maata
            </div>
        )
    }

    if (nayta.length === 1) {
        return  (
            <div>
                <Info
                    maa={nayta} />
            </div>
        )
    }

    if (nayta.length === 0) {
        return(
            <div>
                <br />
                Ei yhtään maata
            </div>
        )
    }

    const valitseMaa = ({ maa }) => {
        setHaku(maa)
    }


    return ( 
        <div>
            {nayta.map(maa => (
                <li key={maa}>
                    {maa}<button onClick={() => valitseMaa({maa})}>Valitse</button>
                </li>
            ))}    
        </div>
     );
}
 
export default Filter;