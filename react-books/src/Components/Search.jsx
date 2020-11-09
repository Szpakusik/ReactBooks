import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

function Search({ handleSearch, handleQueryChange, handleAuthorChange, handleLanguageChange, handleFromDateChange, handleToDateChange }) {

  return (
    <>
      <Row className="p-3">
        <Col>
          <p className="h3 mx-auto">Znajdź książkę dla siebie!</p>
          <Row>
            <Col className="">
              <input type="text" className="form-control my-1 text-center" onChange={ handleQueryChange } placeholder="Tytuł" />
            </Col>
            <Col>
              <input type="text" className="form-control my-1 text-center" onChange={ handleAuthorChange } placeholder="Autor"/>
            </Col>
          </Row>
          <Row>
            <Col md="2" className="px-0 pt-2 mb-0 mx-auto">
              <p className="h6">Rok publikacji </p>
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col xs={6} md="2" className="px-0">
              <input type="text" className="form-control my-1 text-center" onChange={ handleFromDateChange } placeholder="Od"/>
            </Col>
            <Col xs={6} md="2" className="px-0">
              <input type="text" className="form-control my-1 text-center" onChange={ handleToDateChange } placeholder="Do"/>
            </Col>
            <Col md="4" className="pl-5 pr-3">
              <select onChange={handleLanguageChange} className="form-control m-1 text-center">
                <option value="" defaultValue>Wybierz język</option>
                <option value="pl">Polski</option>
                <option value="en">Angielski</option>
                <option value="de">Niemiecki</option>
                <option value="ru">Rosyjski</option>
              </select>
            </Col>
          </Row>
          <Button className="mt-2" variant="success" onClick={ handleSearch }>Szukaj</Button>
        </Col>
      </Row>
    </>
  )
}

export default Search;