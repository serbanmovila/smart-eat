import React from 'react'
import styled from 'styled-components'
import {MealTypes} from "../../Recipes/Components/AddRecipeForm";

const ChoiceContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`

const ChoiceBox = styled.div`
    width: 50%;
    height: 50%;
    border: 1px solid rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    p {
        font-family: 'Libre Baskerville', serif;
        font-weight: 600;
        font-style: italic;
        font-size: 200%;
        letter-spacing: 3px;
    }
`

export default function PickMeal(props) {
    return (
        <ChoiceContainer>
            <ChoiceBox
                onClick={() => {
                    props.pick(MealTypes.Snack)
                }}
            >
                <p>Snack</p>
            </ChoiceBox>
            <ChoiceBox
                onClick={() => {
                    props.pick(MealTypes.Starter)
                }}
            >
                <p>Starter</p>
            </ChoiceBox>
            <ChoiceBox
                onClick={() => {
                    props.pick(MealTypes.MainCourse)
                }}
            >
                <p>Main Course</p>
            </ChoiceBox>
            <ChoiceBox
                onClick={() => {
                    props.pick(MealTypes.Dessert)
                }}
            >
                <p>Dessert</p>
            </ChoiceBox>
        </ChoiceContainer>
    )
}
