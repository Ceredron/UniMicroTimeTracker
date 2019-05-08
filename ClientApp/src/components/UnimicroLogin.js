// Used for inputting login information, logging in and retrieving the necessary JWT token.
// POST to https://test-api.unieconomy.no/api/init/sign-in
// JSON Body: UserName: Username, Password: password
// Headers: Content-Type: application/json

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/UnimicroLogin';

class UnimicroLogin extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props){
        if(props.refreshCompanies){
            props.getCompanies();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        const data = new FormData(event.target);
        const username = data.get('username');
        const password = data.get('password');

        this.props.getJwtToken(username, password);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Enter username</label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="password">Enter your password</label>
                    <input id="password" name="password" type="password" />

                    <button>Submit</button>
                </form>
                <h1>{this.props.message}</h1>
                <h1>{this.props.chosenCompanyKey === '' ? '' : 'Using company ' + this.props.chosenCompanyKey}</h1>
            </div>
        );
    }
}

export default connect(
    state => state.login,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UnimicroLogin);
