import { useCallback, useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import {countries} from './utilis/Api'

function App() {
const [query, setQuery] = useState('')
const [suggestion, setSuggestion] = useState([])



const queryHandler = useCallback(val =>
  {
    setQuery(val)
  },[])
 


  // Filtering the countries based on the value entered in the input box
useEffect(()=>
{
  if(query ==='')
  {
    setSuggestion([])
  }else{
    let inputText = query.toLowerCase()
    let newSuggestion  = countries.filter(item=>
      {
      return  item.country.toLowerCase().indexOf(inputText)!==-1 ? true : false;
      }).map(item=>item.country)

      console.log(newSuggestion)
      setSuggestion(newSuggestion)
  }


},[query])




  return (
    <div className="App">
    <h3>Search Query is {query}</h3>
    <SearchBar suggestion={suggestion} setQuery={setQuery} queryHandler = {queryHandler} />
    </div>
  );
}

export default App;
