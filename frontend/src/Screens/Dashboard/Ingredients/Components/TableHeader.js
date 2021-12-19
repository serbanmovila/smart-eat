import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    border-bottom: 2px solid #efeff7;
`

const Cell = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: left;
    padding: 1.5% 2%;
    font-weight: 700;

    &.ingredient-name {
        width: 40%;
    }

    &.ingredient-qty,
    &.ingredient-unit,
    &.ingredient-price {
        width: 45%;
        justify-content: center;
    }
`

export default function TableHeader(props) {
    return (
        <Header>
            <Cell className="ingredient-name">Name</Cell>
            <Cell className="ingredient-qty">Qty</Cell>
        </Header>
    )
}
