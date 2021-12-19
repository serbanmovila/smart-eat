import axios from 'axios'

export const getIngredients = () => (dispatch) => {
    axios({
        method: 'get',
        url: 'http://localhost:3001/ingredients'
    }).then(
        (res) => {
            dispatch({
                type: 'GET_INGREDIENTS',
                ingredients: res.data.ingredients
            })
        },
        (err) => {
            console.error(err)
        }
    )
}

export const addIngredient = (data, cb) => (dispatch) => {
    axios({
        method: 'post',
        url: 'http://localhost:3001/ingredients',
        data: { ingredient: data }
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}

export const deleteIngredient = (id, cb) => (dispatch) => {
    axios({
        method: 'delete',
        url: `http://localhost:3001/ingredients/${id}`
    }).then(
        (res) => {
            cb()
        },
        (err) => {
            console.error(err)
        }
    )
}

export const updateIngredient = (id, data, cb) => (dispatch) => {
    axios({
        method: 'put',
        url: `http://localhost:3001/ingredients/${id}`,
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
