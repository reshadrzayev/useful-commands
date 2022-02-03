import React, { useState } from 'react'
import JSONData from './MOCK_DATA.json';

let sortedData = JSONData.slice().sort((a, b) => b.id - a.id);
const SearchApp = () => {
    const [serachterm, setSearchterm] = useState('');


    const [loading, setLoading] = useState(false)
    const [current, setCurrent] = useState(1)
    const [cardCount] = useState(4)

    const indexOfLastCard = current * cardCount;
    const indexOfFirstCard = indexOfLastCard - cardCount;

    const searched =sortedData.filter((val) => {
        if (serachterm === '') {
            return val
        } else if (val.title.toLowerCase().includes(serachterm.toLowerCase())) {
            return val
        }
    })

    const currentCard = searched.slice(indexOfFirstCard, indexOfLastCard)

    const paginate = (pageNumber) => {
        setCurrent(pageNumber)
    }

    // if(serachterm.length != 0){
    //     setCurrent(1)
    // }

    return (
        <div className="main">
            <input type="text" placeholder="Search a command..." onChange={(e) => { setSearchterm(e.target.value) }} />
            {currentCard.map((val, key) => {
                return (
                    <div className="cards" key={key}>
                        <div className='card'>
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p> <br />
                            <button onClick={() => { navigator.clipboard.writeText(val.desc) }}>copy </button>
                        </div>
                    </div>
                );
            })}
            <Pagination searched={searched} cardCount={cardCount} total={sortedData.length} paginate={paginate} currentCard={currentCard} searchTerm={serachterm} setCurrent={setCurrent} />
        </div>
    )
}


const Pagination = (props) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.total / props.cardCount); i++) {
        pageNumbers.push(i);
    }

    console.log(props.searched);
    console.log(props.currentCard);
    console.log(pageNumbers);
    console.log(props.cardCount);

    if(props.searched.length < Math.ceil(props.total / props.cardCount)){
        content = <li>{Math.ceil(props.searched.length/props.cardCount)} {props.setCurrent(Math.ceil(props.searched.length/props.cardCount))}</li>
    }
    else if(props.searched.length > 0){
        content = pageNumbers.map((number) => {
            return <li key={number} onClick={() => props.paginate(number)}>
                {number}
            </li>
        })
    }

    var content
    return (
        <div className='pagination'>
            <ul>
                {
                    content    
                }
            </ul>

        </div>
    )
}

export default SearchApp
