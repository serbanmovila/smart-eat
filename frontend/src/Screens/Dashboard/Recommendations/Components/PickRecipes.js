import React from 'react'
import Recipe from '../../Recipes/Components/Recipe'
import {connect} from 'react-redux'
import styled from "styled-components";

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

class PickRecipes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            choices: []
        }
    }

    componentDidMount() {
        const c = [];

        this.props.recipes.map(recipe => {
            recipe.selected = false;
            if (recipe.tipPreparat.toLowerCase() === this.props.type.toLowerCase()) c.push(recipe)
        })

        this.setState({
            choices: c
        });
    }

    select = (recipe) => {
        const c = this.state.choices;

        const n = c.filter(recipe => recipe.selected).length

        if (n < 3 || (n >= 3 && c[c.indexOf(recipe)].selected === true)) {
            c[c.indexOf(recipe)].selected = !c[c.indexOf(recipe)].selected;

            this.setState({
                choices: c
            }, () => {
                this.props.setSelection(this.state.choices.filter(recipe => recipe.selected))
            })
        }
    }

    render() {
        return (
            <RecipesListing>
                {this.state.choices.map(recipe => {
                    return <Recipe highlight={recipe.selected} handleClick={() => {
                        this.select(recipe)
                    }} data={recipe}/>
                })}
            </RecipesListing>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes
    }),
    {}
)(PickRecipes)
