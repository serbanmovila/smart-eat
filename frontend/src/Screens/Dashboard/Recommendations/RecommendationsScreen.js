import React from 'react'
import PickMeal from './Components/PickMeal'
import PickRecipes from './Components/PickRecipes'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import ScoreRecipes from './Components/ScoreRecipes'
import Modal from '../../../Helpers/Modal/Modal'
import styled from 'styled-components'
import Recipe from '../Recipes/Components/Recipe'
import { getRecipes } from '../Recipes/Controllers/RecipeActions'

const InnerModal = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 4px;
    padding: 3%;
    align-items: center;
    width: 400px;
`

class RecommendationsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            phase: 1,
            selected: [],
            maxPrice: 15,
        }
    }

    componentDidMount() {
        this.props.getRecipes()
    }

    pick = (type) => {
        this.setState({
            phase: 2,
            type: type
        })
    }

    setSelection = (recipes) => {
        recipes.forEach(recipe => {
            recipe.score = 50
        })
        this.setState({
            selected: recipes
        })
    }

    score = () => {
        this.setState({
            phase: 3
        })
    }

    close = () => {
        this.setState({
            modal: false
        })
    }

    submit = () => {
        this.setState({
            modal: true,
        })
    }

    solveSimplex = (selected) => {
        const SimpleSimplex = require('simple-simplex')

        const solver = new SimpleSimplex({
            objective: {
                a: selected[0].score,
                b: selected[1].score,
                c: selected[2].score
            },
            constraints: [
                {
                    namedVector: { a: 1, b: 1, c: 1 },
                    constraint: '<=',
                    constant: 1
                },
                {
                    namedVector: { a: 1, b: 0, c: 0 },
                    constraint: '<=',
                    constant: 1
                },
                {
                    namedVector: { a: 0, b: 1, c: 0 },
                    constraint: '<=',
                    constant: 1
                },
                {
                    namedVector: { a: 0, b: 0, c: 1 },
                    constraint: '<=',
                    constant: 1
                },
                {
                    namedVector: { a: parseInt(selected[0].price), b: 0, c: 0 },
                    constraint: '<=',
                    constant: this.state.maxPrice
                },
                {
                    namedVector: { a: 0, b: parseInt(selected[1].price), c: 0 },
                    constraint: '<=',
                    constant: this.state.maxPrice
                },
                {
                    namedVector: { a: 0, b: 0, c: parseInt(selected[2].price) },
                    constraint: '<=',
                    constant: this.state.maxPrice
                },
            ],
            optimizationType: 'max'
        })

        const result = solver.solve({
            methodName: 'simplex'
        })

        let maxCoef = 0
        let coefIndex = null
        for(const coefficient in result.solution.coefficients) {
            if(result.solution.coefficients[coefficient] !== 0 && result.solution.coefficients[coefficient]) {
                if(result.solution.coefficients[coefficient] > maxCoef) {
                    maxCoef = result.solution.coefficients[coefficient]
                    coefIndex = coefficient.charCodeAt(0) - 'a'.charCodeAt(0)
                }
            }
        }
        this.setState({
            recommendation: this.state.selected[coefIndex]
        })
    }

    scoreChange = (value, index) => {
        let newSelected = this.state.selected
        newSelected[index].score = value
        this.setState({
            selected: newSelected
        })
        this.solveSimplex(newSelected)
    }

    render() {
        const { phase } = this.state

        return (
            <Container>
                <Header>
                    <HeaderContent>
                        <h3>Get recommendation</h3>
                        <p>
                            {phase === 1 && 'Step 1: Pick a meal'}
                            {phase === 2 &&
                            'Step 2: Select three different recipes'}
                            {phase === 3 &&
                            'Step 3: Give each of them a score from 1 to 100'}
                        </p>
                    </HeaderContent>
                    {phase === 2 && this.state.selected.length === 3 && (
                        <Button onClick={this.score}>Score them</Button>
                    )}
                    {phase === 3 && (
                        <Button onClick={this.submit}>Get recipe</Button>
                    )}
                </Header>
                {phase === 1 && <PickMeal pick={this.pick} />}
                {phase === 2 && (
                    <PickRecipes
                        type={this.state.type}
                        setSelection={this.setSelection}
                    />
                )}
                {phase === 3 &&
                <ScoreRecipes
                    selected={this.state.selected}
                    onChange={this.scoreChange}
                />}
                <Modal close={this.close} open={this.state.modal}>
                    <InnerModal>
                        <h3>Your best recipe is:</h3>
                        <Recipe
                            scoring={true}
                            highlight={true}
                            data={this.state.recommendation}
                        />
                    </InnerModal>
                </Modal>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes
    }),
    { getRecipes }
)(RecommendationsScreen)
