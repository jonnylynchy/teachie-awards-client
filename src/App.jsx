import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './components/RegistrationForm';

import TopNav from './components/TopNav';
import API from './utils/API';
import './App.css';

class App extends PureComponent {
    state = {
        serverMessage: ''
    };

    componentDidMount() {
        this.upTest();
    }

    upTest = () => {
        API.get('/public/uptest')
            .then(res => this.setState({ serverMessage: res.data }))
            .catch(err => console.log(err));
    };

    render() {
        const { serverMessage } = this.state;
        return (
            <Router>
                <div className="h-100">
                    <div className="circle" />
                    <div className="hex" />
                    {/* NAV */}
                    <TopNav />
                    <Route exact path="/" render={() => <Home serverMessage={serverMessage} />} />
                    <Route exact path="/register" component={Register} />
                </div>
            </Router>
        );
    }
}

export default App;
