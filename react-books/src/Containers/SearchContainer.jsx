import React, {useState} from 'react'
import { connect } from 'react-redux';
import * as BookActions from "../Actions/BookActions"
import Search from "../Components/Search"

function SearchContainer({ findBooks, books }) {

  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setlanguage] = useState("");

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const handleQueryChange = e => setSearch(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleFromDateChange = e => setFromDate(e.target.value);
  const handleToDateChange = e => setToDate(e.target.value);
  
  const handleSearch = () => {
    findBooks({
      search,
      author,
      language,
      fromDate,
      toDate
    })
  }

  return (
    <>
      <Search
        handleSearch={handleSearch}
        handleQueryChange={handleQueryChange}
        handleAuthorChange={handleAuthorChange}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange} />
    </>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return{
      books: state.bookReducer.books,
  }
}

export default connect(mapStateToProps, BookActions)(SearchContainer);
