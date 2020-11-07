import * as React from 'react';
import * as BookActions from "../Actions/BookActions"
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Book } from '../Components/Book';

function BookContainer ( { books } ) {
    console.log(books);
    return (
        <>
            <Row>
                { books.length ? books.map( book => 
                    <Book />
                ) : null }
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    console.log(state);
    return{
        books: state.bookReducer.books,
    }
}

export default connect(mapStateToProps, BookActions)(BookContainer);