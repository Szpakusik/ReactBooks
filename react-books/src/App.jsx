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
      <Navbar className="bg-dark text-center" expand="md">qwe</Navbar>
      <Container>
        <SearchContainer />
        <BookContainer />
      </Container>
    </div>
  );
}

export default App;
