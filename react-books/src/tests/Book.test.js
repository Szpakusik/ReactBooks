import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Book from "../Components/Book";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const fakeBook = {
    "volumeInfo": {
    "title": "Lord Jim",
    "authors": [
        "Joseph Conrad"
    ],
    "publishedDate": "2018-12-03",
    "description": "\"Lord Jim\" to najbardziej ceniona współcześnie powieść Josepha Conrada. Tytułowy bohater jest młodym Anglikiem, pochodzącym z dobrego domu. Śledzimy jego losy od początków służby w marynarce handlowej, przez pracę w portach południowo-wschodniej Azji, aż po zdobyte przywództwo na Borneo. Przede wszystkim jednak utwór jest historią o utraconym honorze i próbach rehabilitacji. Conrad dostarcza czytelnikom nie tylko barwnych opisów morskich przygód, ale i przybliża egzotykę Wschodu. Powieść skupia się wokół dylematów sumienia, lojalności, zdrady i konfrontacji z wrażliwością serca. Jak zwykle Conrad eksperymentuje z ludzkimi słabościami i namiętnościami, które wystawiają etykę bohaterów na próbę. Nowatorskie środki użyte przez autora do przedstawienia problematyki moralności i psychiki człowieka, sytuują Conrada wśród pierwszych modernistów literatury angielskiej. Joseph Conrad, właśc. Józef Teodor Konrad Korzeniowski (1857-1924) - angielski pisarz, polskiego pochodzenia. Tworzył w języku angielskim. Jego powieści i opowiadania są oparte na osobistych doświadczeniach. Dominuje w nich problematyka moralno-psychologiczna. Conrad koncentruje się wokół ludzi morza, zmagających się z potęgą żywiołów. Według autora, człowiek nawet w na pozór beznadziejnej sytuacji powinien podejmować próbę walki z losem. Najważniejsze dzieła Conrada to: \"Lord Jim\", \"Jądro ciemności\", \"Tajfun\", \"Zwierciadło morza\", \"Smuga cienia\", \"Złota strzała\".",
    "imageLinks": {
        "smallThumbnail": "http://books.google.com/books/content?id=THx8DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        "thumbnail": "http://books.google.com/books/content?id=THx8DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "pl",
    }
};

const book = fakeBook;
const bookInfo = book.volumeInfo;
const bookDesc = bookInfo.description;
const bookImages = bookInfo.imageLinks;
const bookReleaseDate = bookInfo.publishedDate;
let biggerImg = bookImages && bookImages.thumbnail
biggerImg= biggerImg && biggerImg.replace("&zoom=1","")

it("Renders book", async () => {

    act( () => {
        render(
        <Book 
            title={bookInfo.title} 
            releasedDate={bookReleaseDate} 
            author={bookInfo.authors && bookInfo.authors[0]}
            description={bookDesc ? bookDesc : "No description available"} 
            isDescShortened={bookDesc && bookDesc.length > 130}
            image={biggerImg}
            key={book.id}
        />, container);
    });

    expect(container.querySelector(".card-title").textContent).toBe(bookInfo.title);
    expect(container.querySelector(".card-text").textContent ).toContain(bookDesc.slice(0, 10));
    expect(container.textContent).toContain(bookInfo.authors[0]);
    expect(container.querySelectorAll("img").length).toBe(1);

});

it("Shorten description", async () => {
    act( () => {
        render(
        <Book 
            title={bookInfo.title} 
            releasedDate={bookReleaseDate} 
            author={bookInfo.authors && bookInfo.authors[0]}
            description={bookDesc ? bookDesc : "No description available"} 
            isDescShortened={bookDesc && bookDesc.length > 130}
            image={biggerImg}
            key={book.id}
        />, container);
    });
    expect(container.querySelector(".card-text").textContent.length ).toBeLessThan(150);
})