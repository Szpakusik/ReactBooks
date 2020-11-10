import axios from "axios"

let searchIndex = 0;

export const findBooks = ({ search, author, language, fromDate, toDate, resultsNumber, toShowNumber, overwrite }) => {

    const action = overwrite ? "GET_BOOKS" : "GET_MORE_BOOKS";
    searchIndex = overwrite ? 0 : searchIndex;

    const languageParameter = language ? `&langRestrict=${language}`: "";
    const startIndexParameter = `&startIndex=${searchIndex}`

    let url = `https://www.googleapis.com/books/v1/volumes?q=${search+" "+author}&maxResults=40`;
    url = url + languageParameter + startIndexParameter;

    searchIndex += 40;

    return ( dispatch ) => {
        dispatch( { type: "START_SEARCH" } )
        return axios.get(url).then( (response) => {

            let filteredBooks = response.data.items
            if( !filteredBooks ) {
                dispatch( { type: action, payload: { filteredBooks: [] }  } )
                dispatch( { type: "SET_BUSY", payload: false } )
                return false;
            }


            filteredBooks = checkAuthorMatch( author, filteredBooks )
            filteredBooks = checkDateMatch( fromDate, toDate, filteredBooks )

            dispatch( { type: action, payload: { filteredBooks }  } )

            if( toShowNumber > resultsNumber + filteredBooks.length && response.data.items.length ){
                findBooks({ 
                    search,
                    author,
                    language,
                    fromDate,
                    toDate,
                    toShowNumber,
                    resultsNumber: resultsNumber + filteredBooks.length,
                    overwrite: false }
                )(dispatch)
            } 
            else dispatch( { type: "SET_BUSY", payload: false } )

        } )
        .catch( (err) => {
            dispatch( { type: "SET_BUSY", payload: false } )
        } )
    }
};

export const increaseBookLimit = ( ) => {
    return ( dispatch ) => {
        dispatch( { type: "SET_BOOK_LIMIT" } )
    }
}

export const resetBookLimit = ( ) => {
    return ( dispatch ) => {
        dispatch( { type: "RESET_BOOK_LIMIT" } )
    }
}

export const setQueryInfo = (queryInfo) => {
    return ( dispatch ) => {
        dispatch( { type: "SET_QUERY_INFO", payload: queryInfo } )
    }
}
export const setBusy = ( busyStatus ) => {
    return ( dispatch ) => {
        dispatch( { type: "SET_BUSY", payload: busyStatus } )
    }
}

const checkAuthorMatch = ( authorSearch, books ) => {
    
    let filtered = books
    
    if ( authorSearch ) {

        filtered = books.filter( ( book ) => {

            let filterResult = false
            let authorSearchParts = authorSearch.split(" ")
            let authorsArray = book.volumeInfo.authors;
            if ( !authorsArray ) return false;

            outer: for (let j = 0; j < authorsArray.length; j++) {
                for (let i = 0; i < authorSearchParts.length; i++) {
                    let searchPart = authorSearchParts[i].toLowerCase();
                    filterResult = authorsArray[j].toLowerCase().includes( searchPart )
                    if( filterResult ) break outer;
                }
            }
            return filterResult
        } )

    }

    return filtered
}

const checkDateMatch = ( fromDate, toDate, books ) => {

    if ( !fromDate && !toDate ) return books

    return books.filter( ( book ) => {
        const releaseDate = book.volumeInfo.publishedDate;
        const releaseYear = releaseDate && releaseDate.slice(0, 4);
        
        if ( fromDate && fromDate > releaseYear) return false;
        if ( toDate && toDate < releaseYear) return false;

        return true
    } )

}