import React, { useState } from 'react'
import JSONData from './MOCK_DATA.json';

let sortedData = JSONData.slice().sort((a, b) => b.id - a.id);
const SearchApp = () => {
    const [serachterm, setSearchterm] = useState('');
    
    return (
        <div className="main">
            <input type="text" placeholder="Search a command..." onChange={(e) => { setSearchterm(e.target.value) }} />
            {sortedData.filter((val) => {
                if (serachterm === '') {
                    return val
                } else if (val.title.toLowerCase().includes(serachterm.toLowerCase())) {
                    return val
                }
            }).map((val, key) => {
                return (
                    <div className="cards" key={key}>
                        <div className='card'>
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                            <button onClick={() => {navigator.clipboard.writeText(val.desc)}}>copy </button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default SearchApp
