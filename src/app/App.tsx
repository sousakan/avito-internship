import { Provider } from 'react-redux';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List/List';
import styles from './App.module.scss';
import './styles/global.scss';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { fetchStoriesIds } from '../features/stories/asyncActions';
import store from './store';
import Story from '../components/Story';
import config from '../config';

store.dispatch(fetchStoriesIds());
setInterval(() => store.dispatch(fetchStoriesIds()), config.refreshTime * 1000);

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header className={styles.app__header} />
          <Switch>
            <Container>
              <Route path="/" exact>
                <List />
              </Route>
              <Route path="/story/:id" exact>
                <Story />
              </Route>
            </Container>
            <Route path="*" exact>
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
