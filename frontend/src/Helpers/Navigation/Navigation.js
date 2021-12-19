import React from 'react'
import styled from 'styled-components'
import { Menu } from '@material-ui/icons'
import { Button, IconButton } from '@material-ui/core/'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'
import img6 from '../../assets/images/6.jpg'
import img7 from '../../assets/images/7.jpg'

const NavContainer = styled.div`
    max-width: 300px;
    min-width: 250px;
    width: 20%;
    height: 100vh;
    align-items: center;
    background: white;
    -webkit-box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
    z-index: 3;
    background-size: cover;
    background-position: center;

    @media (max-width: 600px) {
        height: 100%;
        position: fixed;
        width: 250px;
        top: 0;
        transition: left 0.2s ease-in-out;
    }
`

const NavBgOverlay = styled.div`
    height: 100%;
    width: 100%;
    background: rgb(55, 59, 96, 0.76);
    display: flex;
    flex-direction: column;
`

const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 600px) {
        height: 100%;
        width: 250px;
        top: 0;
        left: -250px;
        transition: left 0.2s ease-in-out;
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    button {
        border-radius: 0px;
        padding: 4% 0;
        color: rgba(255, 255, 255, 0.9);
        text-transform: none;
        letter-spacing: 1px;

        span {
            text-align: left;
            padding-left: 10%;
            display: flex;
            justify-content: flex-start;
        }

        :not(:first-child) {
            border-top: 1px solid rgba(0, 0, 0, 0.2);
        }

        &.active {
            background: rgba(0, 0, 0, 0.3);
        }
    }
`

const NavHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 600px) {
        display: none;
    }
`

const MobileNavHeader = styled.div`
    display: none;

    @media (max-width: 600px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: #efeff7;
        box-shadow: 0 0 0 0.4px rgb(55, 59, 96);
    }
`

const Logo = styled.h1`
    font-family: 'Libre Baskerville', serif;
    font-style: italic;
    color: white;
    font-size: 130%;
    letter-spacing: 2px;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    margin-left: 10%;

    @media (max-width: 600px) {
        color: rgba(0, 0, 0, 0.8);
        margin: auto 0;
    }
`

const MenuBtn = styled.span`
    cursor: pointer;
`

const Mask = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 2;
`

export default class Navigation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mobileNavState: '-250px'
        }
    }

    switchNav = () => {
        if (this.state.mobileNavState === '-250px') {
            this.setState({
                mobileNavState: '0px'
            })
        } else {
            this.setState({
                mobileNavState: '-250px'
            })
        }
    }

    render() {
        const { screen } = this.props

        let bg,
            bgs = [img1, img2, img3, img4, img5, img6, img7]

        bg = bgs[Math.floor(Math.random() * 7)]

        return (
            <>
                {this.state.mobileNavState === '0px' && (
                    <Mask onClick={this.switchNav} />
                )}
                <MobileNavHeader>
                    <Logo>FoodRecipes</Logo>
                    <IconButton onClick={this.switchNav}>
                        <Menu />
                    </IconButton>
                </MobileNavHeader>
                <NavContainer
                    style={{
                        backgroundImage: `url(${bg})`,
                        left: this.state.mobileNavState
                    }}
                >
                    <NavBgOverlay>
                        <NavHeader>
                            <Logo>FoodRecipes</Logo>
                        </NavHeader>
                        <Nav>
                            <List>
                                <Button
                                    className={
                                        screen === 'ingredients' ? 'active' : ''
                                    }
                                    onClick={() =>
                                        this.props.switchScreen('ingredients')
                                    }
                                >
                                    Ingredients
                                </Button>
                                <Button
                                    className={
                                        screen === 'recipes' ? 'active' : ''
                                    }
                                    onClick={() =>
                                        this.props.switchScreen('recipes')
                                    }
                                >
                                    Recipes
                                </Button>
                                <Button
                                    className={
                                        screen === 'recommendations'
                                            ? 'active'
                                            : ''
                                    }
                                    onClick={() =>
                                        this.props.switchScreen(
                                            'recommendations'
                                        )
                                    }
                                >
                                    Get recommendation
                                </Button>
                            </List>
                        </Nav>
                    </NavBgOverlay>
                </NavContainer>
            </>
        )
    }
}
