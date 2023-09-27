import './App.css';
import { Provider} from 'react-redux';
import store from './redux/store';
import Router from './router/router';
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
    </Provider>
  );
}

export default App;
