// This is for centralizing and exporting all styled components
// commonly used in Dashboard

import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: 100%;

    @media only screen and (max-width: 600px) {
        align-items: flex-start;
    }
`

export const Header = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    align-items: center;
    height: auto;

    & > button {
        background: rgb(55, 59, 96);
        padding: 1% 2%;
        color: rgba(255, 255, 255, 0.9);

        &:hover {
            background: #2d304e;
        }
    }

    @media only screen and (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3 {
        font-family: 'Libre Baskerville', serif;
        font-style: italic;
        color: rgba(0, 0, 0, 0.7);
        font-size: 200%;
        margin-bottom: 0;
        font-weight: 700;
        letter-spacing: 1.4px;
        margin-top: 0;
    }

    p {
        margin-top: 10px;
        color: rgba(0, 0, 0, 0.7);
        font-size: 120%;
        text-align: left;
    }
`
