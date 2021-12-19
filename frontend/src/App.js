import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppNavigator from './Screens/AppNavigator/AppNavigator'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { checkLogin } from './Screens/Auth/Controllers/AuthActions'

function App(props) {
    useEffect(() => {
        props.checkLogin()
    }, [])

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/ingredients">
                        <AppNavigator screen="ingredients" />
                    </Route>
                    <Route path="/recipes">
                        <AppNavigator screen="recipes" />
                    </Route>
                    <Route path="/recommendations">
                        <AppNavigator screen="recommendations" />
                    </Route>
                    <Route path="/">
                        <AppNavigator />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default connect((state) => ({ ...state }), { checkLogin })(App)
