import React from 'react'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Recipe from './Components/Recipe'
import Modal from '../../../Helpers/Modal/Modal'
import AddRecipeForm from './Components/AddRecipeForm'
import { getRecipes } from './Controllers/RecipeActions'
import { FormatListNumberedRtlRounded, ThreeSixty } from '@material-ui/icons'

const RecipesListing = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: 80%;
    width: 100%;
    overflow: auto;
    align-self: flex-end;
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

class RecipesScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            recipeData: {},
            preloaded: false
        }
    }

    componentDidMount() {
        this.props.getRecipes()
    }

    close = () => {
        this.setState({
            preloaded: false,
            openModal: false
        })
    }

    open = () => {
        this.setState({
            openModal: true
        })
    }

    viewRecipe = (data) => {
        this.setState(
            {
                preloaded: true,
                recipeData: data
            },
            () => {
                this.setState({
                    openModal: true
                })
            }
        )
    }

    render() {
        const recipes = this.props.recipes
        return (
            <>
                <Container>
                    <Header>
                        <HeaderContent>
                            <h3>Recipes</h3>
                            <p>
                                View, add, edit and remove recipes of all kinds.
                            </p>
                        </HeaderContent>
                        <Button endIcon={<AddCircleIcon />} onClick={this.open}>
                            New Recipe
                        </Button>
                    </Header>
                    <RecipesListing>
                        {recipes.map((recipe) => {
                            return (
                                <Recipe
                                    handleClick={() => {
                                        this.viewRecipe(recipe)
                                    }}
                                    data={recipe}
                                />
                            )
                        })}
                    </RecipesListing>
                </Container>
                <Modal close={this.close} open={this.state.openModal}>
                    <AddRecipeForm
                        close={this.close}
                        preloaded={this.state.preloaded}
                        data={this.state.recipeData}
                    />
                </Modal>
            </>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes
    }),
    { getRecipes }
)(RecipesScreen)
