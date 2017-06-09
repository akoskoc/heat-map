import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import './styles/main.css';

/* Reducer */
import reducer from "./reducer/reducer"

/* Components */
import Graph from './components/graph';
import Footer from "./components/footer"
import Title from "./components/title"

/* Create store */
const store = createStore(reducer)


class App extends React.Component {
    render() {
        return(
            <div>
                <Title />
                <Graph />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);



registerServiceWorker();
