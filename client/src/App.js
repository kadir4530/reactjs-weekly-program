import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import Index from './components/DragAndDrop/index'
import ChangePassword from './components/Auth/ChangePassword'

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/changepassword' exact component={ChangePassword} />
          <Route path='/test' component={Index} />
        </Switch>
      </Container>
    </BrowserRouter>

  );
}

export default App;
