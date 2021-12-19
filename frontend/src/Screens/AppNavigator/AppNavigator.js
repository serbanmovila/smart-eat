import React from 'react'
import { connect } from 'react-redux'
import AuthScreen from '../Auth/AuthScreen'
import Dashboard from './../Dashboard/Dashboard'
import { checkLogin } from './../Auth/Controllers/AuthActions'

class AppNavigator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { screen, loggedIn } = this.props

        if (loggedIn) {
            return (
                <Dashboard
                    screen={screen === undefined ? 'ingredients' : screen}
                />
            )
        } else return <AuthScreen />
    }
}

export default connect((state) => ({ ...state }), {})(AppNavigator)
