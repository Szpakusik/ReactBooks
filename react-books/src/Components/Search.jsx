import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

function Search({ handleChange, handleSearch, books }) {

  return (
    <>
      <Row className="p-3">
        <Col>
          <p className="h3">Wpisz nazwę książki</p>
          <input type="text" className="form-control m-3" onChange={ handleChange } />
          <Button variant="success" onClick={ handleSearch }>Szukaj</Button>
          <p className="h3">Znalezione książki: { books.length }</p>
        </Col>
      </Row>
    </>
  )
}

export default Search;