import React from 'react';
import './TodoSearch.css'
function TodoSearch({ searchValue, setSearchValue }) {

    const onChangeInputValue = (event) => {
        setSearchValue(event.target.value)
    }
    return (
        <input
            className="TodoSearch"
            placeholder="Busqueda"
            value={searchValue}
            onChange={onChangeInputValue}
        ></input>
    )
}

export { TodoSearch };