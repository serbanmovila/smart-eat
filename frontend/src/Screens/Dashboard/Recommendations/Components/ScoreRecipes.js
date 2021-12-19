import Recipe from '../../Recipes/Components/Recipe'
import React from 'react'
import styled from 'styled-components'
import { Slider } from '@material-ui/core'

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

const ChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 31.3%;
    margin: 1%;
`

export default function ScoreRecipes(props) {
    return (
        <RecipesListing>
            {props.selected.map((recipe, index) => {
                return (
                    <ChoiceContainer>
                        <Recipe
                            highlight={false}
                            scoring={true}
                            data={recipe}
                        />
                        <Slider
                            defaultValue={50}
                            aria-labelledby="discrete-slider-small-steps"
                            step={1}
                            marks
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={(e, value) => {props.onChange(value, index)}}
                        />
                    </ChoiceContainer>
                )
            })}
        </RecipesListing>
    )
}
