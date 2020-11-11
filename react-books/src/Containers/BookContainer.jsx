import React, { useEffect } from 'react';
import * as BookActions from "../Actions/BookActions"
import { connect } from 'react-redux';
import { Row } from 'react-bootstrap';
import Book from '../Components/Book';
import Loader from 'react-loader-spinner';

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
            { books.length ? <p className="h3 mt-3">Znalezione książki:</p> : null }
            { !books.length && queryInfo.hasOwnProperty("search") && busyStatus === false ? 
            <p className="h5 mt-5 text-secondary">Nie znaleziono żadnych książek...</p> : null }

            <Row className="align-items-stretch">
                { books.length ? books.map( ( book, index ) => {
                        if ( index >= toShowNumber ) return null;

                        const bookInfo = book.volumeInfo;
                        const bookDesc = bookInfo.description;
                        const bookImages = bookInfo.imageLinks;
                        const bookReleaseDate = bookInfo.publishedDate;

                        let biggerImg = bookImages && bookImages.thumbnail ? bookImages.thumbnail 
                        : "http://books.google.com/books/content?id=KCBezQEACAAJ&printsec=frontcover&img=1&source=gbs_api"
                        
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

            { busyStatus && <Loader type="TailSpin" height="50" width="50" className="my-4"/> }
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