import React, {useState} from 'react'
import { connect } from 'react-redux';
import * as BookActions from "../Actions/BookActions"
import Search from "../Components/Search"

function SearchContainer({ findBooks, books }) {

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log(search);
    findBooks(search)
  }
  const handleChange = e => setSearch(e.target.value);

  return (
    <>
      <Search
        books={books}
        handleChange={handleChange}
        handleSearch={handleSearch} />
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
