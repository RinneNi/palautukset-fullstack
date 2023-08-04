const Filter = ({ handleFilterChange, newFilter }) => {
    return ( 
        <div>
            Filtteri: <input
                value={newFilter}
                onChange={handleFilterChange} />
        </div>
    );
}
 
export default Filter;