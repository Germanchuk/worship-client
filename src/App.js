import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout';
import { Route, Switch } from 'react-router';
import AddSong from './pages/AddSong/AddSong';
import OneSongPage from './pages/OneSongPage/OneSongPage';
import EditSongPage from './pages/EditSongPage/EditSongPage';



function App() {
  return (
    <Router>
      <Layout>
        <Switch>

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/add-song">
            <AddSong />
          </Route>
          <Route exact path="/songs/:id">
            <OneSongPage />
          </Route>
          <Route exact path="/edit/:id">
            <EditSongPage />
          </Route>

        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
