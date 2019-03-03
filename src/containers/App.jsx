import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GlobalContext from '../context/GlobalContext';
import Home from '../pages/Home';
import Events from '../components/Events';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import Loader from '../components/Loader';

import TopNav from '../components/TopNav';
import API from '../utils/API';
import './App.css';

class App extends PureComponent {
    state = {
        serverMessage: '',
        isLoading: false,
        auth: {}
    };

    componentDidMount() {
        this.upTest();
    }

    upTest = () => {
        API.get('/public/uptest')
            .then(res => this.setState({ serverMessage: res.data }))
            .catch(err => console.log(err));
    };

    updateLoading = (isLoading = false) => {
        this.setState({ isLoading });
    };

    updateAuth = (auth = {}) => {
        this.setState({ auth });
    };

    render() {
        console.log('App Render State: ', this.state);
        const { serverMessage, isLoading, auth } = this.state;
        const { updateLoading, updateAuth } = this;
        return (
            <Router>
                <GlobalContext.Provider value={{ updateLoading, updateAuth, auth }}>
                    <div className="h-100">
                        {isLoading ? <Loader /> : ''}
                        <div className="circle" />
                        <div className="hex" />
                        {/* NAV */}
                        <TopNav auth={auth} />
                        <Route exact path="/" render={() => <Home serverMessage={serverMessage} />} />
                        <Route exact path="/events" component={Events} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/register" component={Register} />
                    </div>
                </GlobalContext.Provider>
            </Router>
        );
    }
}

export default App;
