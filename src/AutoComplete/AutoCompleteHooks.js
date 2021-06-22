import { useEffect, useRef, useState } from 'react';
import { USERS_API_ENDPOINT } from '../consts';
import { getData, highlightedSection } from '../helpers';
import './styles.css'

function getHighlitedContent(name, term) {
    const highLighting = highlightedSection(name, term);
    if (highLighting) {
        return (
            <>
                {name.substring(0, highLighting.start)}
                <span className='highlighted'>{name.substring(highLighting.start, highLighting.end)}</span>
                {name.substring(highLighting.end, name.length)}
            </>
        )
    }
    return (
        <>{name}</>
    )
}

export function AutoCompleteHooks () {
    const [results, setResult] = useState([]);
    const [err, setError] = useState(null);
    const [value, setValue] = useState('');

    useEffect(()=> {
        async function updateSearchTermResults(searchTerm) {
            const response = await getData(USERS_API_ENDPOINT, 'name');
            if (!response.err && searchTerm) {
                const results = response.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => user.name);
                setResult(results);
                setError(null)
            } else {
                setResult([]);
                setError(response.err);
            }
        }
        updateSearchTermResults(value);
    }, [value])

    

    return (
        <div className="wrapper">
            <input onChange={(ev) => setValue(ev.target.value)} value={value}/>
            {
                err ?
                <p>{err.message}</p> :
                results.length > 0 ?
                    <ul>
                    {
                        results.map(name => <li key={name}>{getHighlitedContent(name, value)}</li>)
                    }
                </ul> :
                <p>No results</p>
            }
            
        </div>
    )
    
}