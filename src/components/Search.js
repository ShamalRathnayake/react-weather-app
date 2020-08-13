import React from 'react'

function Search(props) {

   
   



    return (
        <div className="search-container">
            <input type="text" name="search" id="searchbar" placeholder='Search City..' onChange={e => props.setQuery(e.target.value)} onKeyPress={e => props.search(e)} value={props.query}/>
        </div>
    )
}

export default Search
