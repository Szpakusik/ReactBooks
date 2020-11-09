import React, { useEffect } from 'react';
import * as BookActions from "../Actions/BookActions"
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Book } from '../Components/Book';

function BookContainer ( { books, queryInfo, busyStatus, findBooks, increaseBookLimit, toShowNumber } ) {

    useEffect(() => {
        const onScroll = e => {
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                increaseBookLimit();
                if( toShowNumber >= books.length ) {
                    findBooks({
                        ...queryInfo,
                        resultsNumber: books.length,
                        overwrite: false
                    })
                }
            }
        };
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
    });

    return (
        <>
            <p className="h3 mt-3">Znalezione książki:</p>
            <Row className="align-items-stretch">
                { books.length ? books.map( ( book, index ) => {
                        if ( index >= toShowNumber ) return null;

                        const bookInfo = book.volumeInfo;
                        const bookDesc = bookInfo.description;
                        const bookImages = bookInfo.imageLinks;
                        const bookReleaseDate = bookInfo.publishedDate;

                        let biggerImg = bookImages && bookImages.thumbnail
                        biggerImg= biggerImg && biggerImg.replace("&zoom=1","")
                        
                        return <Book 
                            title={bookInfo.title} 
                            releasedDate={bookReleaseDate} 
                            author={bookInfo.authors && bookInfo.authors[0]}
                            description={bookDesc ? bookDesc : "No description available"} 
                            isDescShortened={bookDesc && bookDesc.length > 130}
                            image={biggerImg}
                            key={book.id}
                        />
                    }
                    
                ) : null }
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return{
        books: state.bookReducer.books,
        queryInfo: state.bookReducer.queryInfo,
        busyStatus: state.bookReducer.loading,
        toShowNumber: state.bookReducer.toShowNumber
    }
}

export default connect(mapStateToProps, BookActions)(BookContainer);