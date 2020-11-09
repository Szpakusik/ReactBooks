import React, {useState} from 'react'
import { connect } from 'react-redux';
import * as BookActions from "../Actions/BookActions"
import Search from "../Components/Search"

function SearchContainer({ findBooks, resetBookLimit, setQueryInfo }) {

  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const handleQueryChange = e => setSearch(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleLanguageChange = e => setLanguage(e.target.value);
  const handleFromDateChange = e => setFromDate(e.target.value);
  const handleToDateChange = e => setToDate(e.target.value);
  
  const handleSearch = () => {
    resetBookLimit()

    setQueryInfo({
      search,
      author,
      language,
      fromDate,
      toDate
    })
    
    findBooks({
      search,
      author,
      language,
      fromDate,
      toDate,
      resultsNumber: 0,
      toShowNumber: 16,
      overwrite: true
    })
  }

  return (
    <>
      <Search
        handleSearch={handleSearch}
        handleQueryChange={handleQueryChange}
        handleAuthorChange={handleAuthorChange}
        handleLanguageChange={handleLanguageChange}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange} />
    </>
  )
}

const mapStateToProps = (state) => {
  return{
      books: state.bookReducer.books,
  }
}

export default connect(mapStateToProps, BookActions)(SearchContainer);
