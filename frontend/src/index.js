import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Reducer from './Reducer'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
    (request) => {
        request.headers.common['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token')
        request.headers['Authorization'] =
            'Bearer ' + sessionStorage.getItem('token')
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)

let store = createStore(Reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)
