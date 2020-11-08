import * as React from 'react';
import * as BookActions from "../Actions/BookActions"
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Book } from '../Components/Book';

function BookContainer ( { books } ) {
    return (
        <>
            <p className="h3 mt-3">Znalezione książki:</p>
            <Row className="align-items-stretch">
                { books.length ? books.map( book => {

                        const bookInfo = book.volumeInfo;
                        const bookDesc = bookInfo.description;
                        const bookImages = bookInfo.imageLinks;

                        let biggerImg = bookImages && bookImages.thumbnail
                        biggerImg= biggerImg && biggerImg.replace("&zoom=1","")
                        
                        return <Book 
                            title={bookInfo.title} 
                            author={bookInfo.authors && bookInfo.authors[0]}
                            description={bookDesc ? bookDesc : "No description available"} 
                            isDescShortened={bookDesc && bookDesc.length > 130}
                            image={biggerImg}
                        />
                    }
                    
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