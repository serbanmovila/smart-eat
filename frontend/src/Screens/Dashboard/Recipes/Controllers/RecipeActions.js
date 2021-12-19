import axios from 'axios'

export const getRecipes = () => (dispatch) => {
    axios({
        method: 'get',
        url: 'http://localhost:3001/recipes'
    }).then(
        (res) => {
            dispatch({
                type: 'GET_RECIPES',
                payload: res.data
            })
        },
        (err) => {
            console.error(err)
        }
    )
}

export const addRecipe = (data, cb) => (dispatch) => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/recipes',
        data: data
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}

export const deleteRecipe = (id, cb) => (dispatch) => {
    axios({
        method: 'DELETE',
        url: `http://localhost:3001/recipes/${id}`
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}

export const saveRecipe = (id, data, cb) => (dispatch) => {
    axios({
        method: 'put',
        url: `http://localhost:3001/recipes/${id}`,
        data: data
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}
