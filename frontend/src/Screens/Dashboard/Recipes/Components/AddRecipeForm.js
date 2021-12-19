import React from 'react'
import {
    MenuItem,
    Select,
    Chip,
    TextField,
    Button,
    FormControl,
    InputLabel
} from '@material-ui/core'
import {
    addRecipe,
    getRecipes,
    saveRecipe,
    deleteRecipe
} from '../Controllers/RecipeActions'
import { connect } from 'react-redux'
import styled from 'styled-components'

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 300px;
    max-height: 500px;
    overflow-y: auto;
    padding: 30px 20px;
    background: white;
    border-radius: 4px;

    /* width */
    &::-webkit-scrollbar {
        width: 6px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 8px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.5);
    }
`

export const MealTypes = {
    Starter: "starter",
    Snack: "snack",
    MainCourse: "main course",
    Dessert: "dessert"
}

class AddRecipeForm extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.preloaded) {
            let {
                name,
                preparare,
                recomandari,
                ingredients,
                tipPreparat,
                price,
                preparationTime,
                _id
            } = this.props.data

            let names = []

            ingredients.map((ingredient) => {
                names.push(ingredient.name)
            })

            this.state = {
                id: _id,
                ingredients: names,
                qtys: ingredients,
                types: '',
                name: name,
                type: tipPreparat,
                preparare: preparare,
                price: price,
                recomandare: recomandari,
                preparationTime: preparationTime
            }
        } else
            this.state = {
                ingredients: [],
                qtys: [],
                types: '',
                name: '',
                type: '',
                price: 0,
                preparare: '',
                recomandare: '',
                preparationTime: ''
            }
    }

    updateValue = (type, content) => {
        switch (type) {
            case 'preparationTime':
                this.setState({
                    preparationTime: content
                })
                break
            case 'name':
                this.setState({
                    name: content
                })
                break
            case 'preparare':
                this.setState({
                    preparare: content
                })
                break
            case 'type':
                this.setState({
                    type: content
                })
                break
            case 'recomandare':
                this.setState({
                    recomandare: content
                })
        }
    }

    clearForm = () => {
        this.setState({
            unitType: '',
            ingredients: [],
            qtys: [],
            types: '',
            name: '',
            type: '',
            preparare: '',
            recomandare: '',
            price: 0
        })
        this.props.getRecipes()
        this.props.close()
    }

    sendRecipe = () => {
        this.props.addRecipe(
            {
                name: this.state.name,
                ingredients: this.state.qtys,
                preparare: this.state.preparare,
                tipPreparat: this.state.type,
                recomandari: this.state.recomandare,
                price: this.state.price,
                preparationTime: this.state.preparationTime
            },
            this.clearForm
        )
    }

    deleteRecipe = () => {
        this.props.deleteRecipe(this.state.id, this.clearForm)
    }

    saveRecipe = () => {
        this.props.saveRecipe(
            this.state.id,
            {
                name: this.state.name,
                ingredients: this.state.qtys,
                preparare: this.state.preparare,
                tipPreparat: this.state.type,
                recomandari: this.state.recomandare,
                price: this.state.price
            },
            this.clearForm
        )
    }

    handleIngredientsChange = (e) => {
        let newQtys = []

        e.target.value.forEach((ingredient) => {
            const obj = {
                name: ingredient,
                quantity: 1
            }

            let found = 0

            this.state.qtys.forEach((qty) => {
                if (qty.name === ingredient) {
                    newQtys.push(qty)
                    found = 1
                }
            })

            if (!found) newQtys.push(obj)
        })

        this.setState({
            ingredients: e.target.value,
            qtys: newQtys
        })
    }

    updateIngredientQty = (ingredient, value) => {
        let qtys = this.state.qtys

        for (let i = 0; i < qtys.length; i++) {
            if (qtys[i].name === ingredient) {
                qtys[i].quantity = value
            }
        }

        this.setState({
            qtys: qtys
        })
    }

    render() {
        const { ingredients } = this.props
        return (
            <FormContainer>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={this.state.name}
                    onChange={(e) => {
                        this.updateValue('name', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                        Ingredients
                    </InputLabel>
                    <Select
                        label="Ingredients"
                        variant="outlined"
                        multiple
                        onChange={this.handleIngredientsChange}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        value={this.state.ingredients}
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        {ingredients.map((ingredient) => {
                            return (
                                <MenuItem
                                    key={ingredient.id}
                                    value={ingredient.name}
                                    selected={
                                        this.state.ingredients.indexOf(
                                            ingredient.name
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                >
                                    {ingredient.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Preparation time (in minutes)"
                    placeholder="60"
                    type="number"
                    value={this.state.preparationTime}
                    onChange={(e) => {
                        this.updateValue('preparationTime', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                />
                {this.state.qtys.map((qty) => {
                    return (
                        <TextField
                            id="outlined-basic"
                            label={qty.name}
                            variant="outlined"
                            placeholder="Quantity"
                            value={qty.quantity}
                            type="number"
                            onChange={(e) => {
                                this.updateIngredientQty(
                                    qty.name,
                                    e.target.value
                                )
                            }}
                            style={{
                                marginBottom: '20px'
                            }}
                        />
                    )
                })}
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                        Recipe type
                    </InputLabel>
                    <Select
                        label="Recipe type"
                        variant="outlined"
                        onChange={(e) => {
                            this.updateValue('type', e.target.value)
                        }}
                        value={this.state.type}
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        <MenuItem
                            value={MealTypes.Snack}
                            selected={
                                this.state.types === MealTypes.Snack
                            }
                        >
                            Snack
                        </MenuItem>
                        <MenuItem
                            value={MealTypes.Starter}
                            selected={
                                this.state.types === MealTypes.Starter
                            }
                        >
                            Starter
                        </MenuItem>
                        <MenuItem
                            value={MealTypes.MainCourse}
                            selected={
                                this.state.types === MealTypes.MainCourse
                            }
                        >
                            Main Course
                        </MenuItem>
                        <MenuItem
                            value={MealTypes.Dessert}
                            selected={
                                this.state.types === MealTypes.Dessert
                            }
                        >
                            Dessert
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    placeholder="Price"
                    type="number"
                    value={this.state.price}
                    onChange={(e) => {
                        this.setState({
                            price: e.target.value
                        })
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Cooking"
                    variant="outlined"
                    value={this.state.preparare}
                    onChange={(e) => {
                        this.updateValue('preparare', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                    multiline
                />
                <TextField
                    id="outlined-basic"
                    label="Recommendations"
                    variant="outlined"
                    value={this.state.recomandare}
                    onChange={(e) => {
                        this.updateValue('recomandare', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                    multiline
                />
                {!this.props.preloaded && (
                    <Button variant="outlined" onClick={this.sendRecipe}>
                        Add Recipe
                    </Button>
                )}
                {this.props.preloaded && (
                    <>
                        <Button variant="outlined" onClick={this.saveRecipe}>
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            style={{
                                marginTop: '10px'
                            }}
                            onClick={this.deleteRecipe}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </FormContainer>
        )
    }
}
export default connect((state) => ({ ...state }), {
    addRecipe,
    getRecipes,
    saveRecipe,
    deleteRecipe
})(AddRecipeForm)
