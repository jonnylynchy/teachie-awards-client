import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GlobalContext from '../context/GlobalContext';
import Home from '../pages/Home';
import About from '../pages/About';
import Winners from '../pages/Winners';
import Events from '../pages/Events';
import EventDetail from '../pages/EventDetail';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import Loader from '../components/Loader';
import TopNav from '../components/TopNav';

import { ACCESS_TOKEN } from '../constants';
import API, { getCurrentUser } from '../utils/API';
import './App.css';

class App extends PureComponent {
    state = {
        serverMessage: '',
        isLoading: false,
        auth: {},
        user: {}
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

    updateUser = (user = {}) => {
        this.setState({ user });
    };

    render() {
        const { serverMessage, isLoading, auth, user } = this.state;
        const { updateLoading, updateAuth, updateUser } = this;

        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken && !user.username) {
            getCurrentUser().then(currentUser => updateUser(currentUser.data));
        }

        if (accessToken && !auth.accessToken) {
            const authObj = {
                accessToken,
                tokenType: 'Bearer'
            };
            updateAuth(authObj);
        }

        return (
            <Router>
                <GlobalContext.Provider value={{ updateLoading, updateAuth, updateUser, auth, user }}>
                    <div className="d-flex flex-column h-100">
                        <div>
                            {isLoading ? <Loader /> : ''}
                            <div className="circle" />
                            <div className="hex" />
                            {/* NAV */}
                            <TopNav auth={auth} />
                            <Route exact path="/" render={() => <Home serverMessage={serverMessage} />} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/winners" component={Winners} />
                            <Route exact path="/events" component={Events} />
                            <Route exact path="/events/detail/:id" component={EventDetail} />
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/(register|register-educator)/" component={Register} />
                        </div>
                        <footer className="footer mt-auto py-3">
                            <div className="container">
                                <span className="text-muted">Teachie Awards</span>
                            </div>
                        </footer>
                    </div>
                </GlobalContext.Provider>
            </Router>
        );
    }
}

export default App;
