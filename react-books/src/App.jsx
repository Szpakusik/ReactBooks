import './App.scss';
import {
  Navbar,
  Container
} from 'react-bootstrap'
import BookContainer from './Containers/BookContainer'
import SearchContainer from './Containers/SearchContainer'

function App() {
  return (
    <div className="App h-100">
      <Navbar className="bg-dark text-center text-light font-weight-bold" expand="md">
        <p className="h3">+ <span className="text-success">React</span> Books</p>
      </Navbar>
      <Container>
        <SearchContainer />
        <BookContainer />
      </Container>
    </div>
  );
}

export default App;
