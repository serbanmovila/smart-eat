import React from 'react'
import IngredientsScreen from './Ingredients/IngredientsScreen'
import RecipesScreen from './Recipes/RecipesScreen'
import RecommendationsScreen from './Recommendations/RecommendationsScreen'
import Navigation from './../../Helpers/Navigation/Navigation'
import styled from 'styled-components'

const DashContainer = styled.div`
    display: flex;
    width: 100%;
`

const AreaContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    min-width: calc(100vw - 250px);
    background: #efeff7;
    padding: 2%;
    height: 100vh;
    max-height: 100vh;

    @media only screen and (max-width: 600px) {
        width: 100%;
        margin-top: 58px;
    }
`

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            screen: this.props.screen
        }
    }

    switchScreen = (screen) => {
        this.setState({
            screen: screen
        })
    }

    render() {
        const { screen } = this.state

        return (
            <DashContainer>
                <Navigation
                    switchScreen={this.switchScreen}
                    screen={this.state.screen}
                />
                <AreaContainer>
                    {screen === 'recipes' && <RecipesScreen />}
                    {screen === 'ingredients' && <IngredientsScreen />}
                    {screen === 'recommendations' && <RecommendationsScreen />}
                </AreaContainer>
            </DashContainer>
        )
    }
}
