import React, { Component } from 'react'
import { Link } from 'gatsby'
 
class Search extends Component {
  state = {
    query: '',
    results: [],
  }

  render() {
    return (
      <div className={this.props.classNames}>
        <input className='search__input'
          type='text' 
          value={this.state.query} 
          onChange={this.search} 
          placeholder={'Search'}
        />
        <ul className='search__list'>
          {this.state.results?this.state.results.map((page) => (
          <li key={page.url}>
            <Link className='search__list_white search__list_non-decoration'
              to={page.url}>
              {page.title}
            </Link>
          </li>
          )):''}
         
        </ul>
      </div>
    )
  }

  getSearchResults(query) {
    console.log("getSearchResults",query)

    if (query ==""|| !query || !window.__LUNR__) {
        console.log("exec setResults([])")
        return
      }
console.log("window.__LUNR__",window.__LUNR__)    
console.log("window.__LUNR__['en']",window.__LUNR__['en'])    
console.log("window.__LUNR__['zh']",window.__LUNR__['zh'])  
const lunaIndex = window.__LUNR__['en']
    const results = lunaIndex.index.search("*"+query+"*")
    console.log("getSearchResults results",results)
    return results.map(({ ref }) => lunaIndex.store[ref])
  }

  search = event => {
    console.log("search",event)
    const query = event.target.value
    console.log("query",event.target.value)
    const results = this.getSearchResults(query)
    console.log("search results",results)
    this.setState({ results, query })
  }
}

export default Search