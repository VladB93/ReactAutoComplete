import { Component, createRef } from 'react';
import { USERS_API_ENDPOINT } from '../consts';
import { getData, highlightedSection } from '../helpers';
import './styles.css'

export class AutoComplete extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            err: null
        }
        this.inputRef = createRef();
    }

    async updateSearchTermResults(searchTerm) {
        const response = await getData(USERS_API_ENDPOINT, 'name');
        if (!response.err && searchTerm) {
            this.setState({
                results: response.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => user.name)
            });
        } else {
            this.setState({
                results: [],
                err: response.err
            });
        }
    }

    getHighlitedContent(name, term) {
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

    render() {
        return (
            <div className="wrapper">
                <input onChange={(ev) => this.updateSearchTermResults(ev.target.value)} ref={this.inputRef}></input>
                {
                    this.state.err ?
                    <p>{this.state.err.message}</p> :
                    this.state.results.length > 0 ?
                     <ul>
                        {
                            this.state.results.map(name => <li key={name}>{this.getHighlitedContent(name, this.inputRef.current.value)}</li>)
                        }
                    </ul> :
                    <p>No results</p>
                }
               
            </div>
        )
    }
}