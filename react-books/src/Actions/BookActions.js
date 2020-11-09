import axios from "axios"

export const findBooks = ({ search, author, language, fromDate, toDate, resultNumber }) => {

    const languageParameter = language ? `&langRestrict=${language}`: ""

    return ( dispatch ) => {
        dispatch( { type: "GET_BOOKS", payload: [] } );
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search+" "+author}&maxResults=40`+languageParameter)
        .then( (response) => {
            let filteredBooks = checkAuthorMatch( author, response.data.items )
            filteredBooks = checkDateMatch( fromDate, toDate, filteredBooks )
            // getMoreResults();
            dispatch( { type: "GET_BOOKS", payload: filteredBooks } )
        } )
        .catch( (err) => {
            throw err;
            // dispatch( { type: "GET_BOOKS_FAILED" } )
        } )
    }
};

const checkAuthorMatch = ( authorSearch, books ) => {
    
    let filtered = books
    
    if ( authorSearch ) {

        filtered = books.filter( ( book ) => {

            let filterResult = false
            let authorSearchParts = authorSearch.split(" ")
            let authorArray = book.volumeInfo.authors;
            if ( !authorArray ) return false;

            outer: for (let j = 0; j < authorArray.length; j++) {
                let author = authorArray[j];
                for (let i = 0; i < authorSearchParts.length; i++) {
                    let searchPart = authorSearchParts[i].toLowerCase();
                    filterResult = author.toLowerCase().includes( searchPart )

                    if( filterResult ) break outer;
                }
            }
            return filterResult
        } )

    }

    return filtered
}

const checkDateMatch = ( fromDate, toDate, books ) => {
    let filtered = books;

    if ( fromDate || toDate ) {
        filtered = books.filter( ( book ) => {
            
            const releaseDate = book.volumeInfo.publishedDate;
            if( !releaseDate ) return false;

            const releaseYear = releaseDate.slice(0, 4);
            
            if ( fromDate && fromDate > releaseYear) return false;
            if ( toDate && toDate < releaseYear) return false;

            return true
        } )
    }

    return filtered
}