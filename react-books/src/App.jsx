import './App.scss';
import SearchContainer from './Containers/SearchContainer'
import {
  Navbar,
  Container
} from 'react-bootstrap'

function App() {
  return (
    <div className="App h-100">
      <Navbar className="bg-dark text-center" expand="md">qwe</Navbar>
      <Container>
        <SearchContainer />
      </Container>
    </div>
  );
}

export default App;
