import React from 'react'
import styled from 'styled-components'
import Ingredient from './Components/Ingredient'
import TableHeader from './Components/TableHeader'
import { Button } from '@material-ui/core'
import Modal from '../../../Helpers/Modal/Modal'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import AddIngredientForm from './Components/AddIngredientForm'
import { connect } from 'react-redux'
import {
    getIngredients,
    deleteIngredient,
    updateIngredient
} from './Controllers/IngredientsActions'

const IngredientsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    overflow: auto;
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

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    -webkit-box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
    height: 80%;

    @media only screen and (max-width: 600px) {
        width: 100%;
        height: auto;
        margin-top: 6%;
    }
`

class IngredientsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            preloaded: false
        }
    }

    close = () => {
        this.setState({
            openModal: false,
            preloaded: false
        })
    }

    open = () => {
        this.setState({
            openModal: true
        })
    }

    openIngredient = (data) => {
        this.setState(
            {
                preloaded: true,
                data: data
            },
            () => {
                this.setState({
                    openModal: true
                })
            }
        )
    }

    deleteIngredient = (id) => {
        this.props.deleteIngredient(id, this.props.getIngredients)
    }

    componentDidMount() {
        this.props.getIngredients()
    }

    render() {
        const { ingredients } = this.props
        return (
            <>
                <Container>
                    <Header>
                        <HeaderContent>
                            <h3>Ingredients</h3>
                            <p>
                                View, add, edit and remove ingredients of all
                                kinds.
                            </p>
                        </HeaderContent>
                        <Button endIcon={<AddCircleIcon />} onClick={this.open}>
                            New Ingredient
                        </Button>
                    </Header>
                    <TableContainer>
                        <TableHeader />
                        <IngredientsList>
                            {ingredients.map((ingredient) => {
                                return (
                                    <Ingredient
                                        data={ingredient}
                                        deleteIngredient={this.deleteIngredient}
                                        editIngredient={this.openIngredient}
                                    />
                                )
                            })}
                        </IngredientsList>
                    </TableContainer>
                </Container>
                <Modal close={this.close} open={this.state.openModal}>
                    <AddIngredientForm
                        close={this.close}
                        preloaded={this.state.preloaded}
                        data={this.state.data}
                    />
                </Modal>
            </>
        )
    }
}

export default connect(
    (state) => ({
        ingredients: state.ingredients,
        token: state.token
    }),
    { getIngredients, deleteIngredient }
)(IngredientsScreen)
