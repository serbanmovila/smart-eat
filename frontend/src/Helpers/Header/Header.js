import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { constants as c } from '../Constants'

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    width: 100%;
    left: 0;
    height: ${c.navHeight}px;
    top: 0;
    z-index: 2;
`

const List = styled.ul`
    display: flex;
    flex-direction: row;
`

const Element = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        text-decoration: none;
        font-weight: 500;
        height: 100%;
        letter-spacing: 1px;
        margin: 0 10px;
        color: white;
        position: relative;
        opacity: 0.8;
        font-family: 'Source Sans Pro', sans-serif;
        transition: opacity 0.3s ease-in-out;

        &::after {
            content: '';
            height: 2px;
            background: white;
            display: block;
            width: 0;
            position: absolute;
            left: 0;
            top: 120%;
            transition: width 0.4s ease-in-out;
        }

        &:hover {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;

            &::after {
                width: 100%;
            }
        }
    }
`

const Logo = styled.h1`
    font-family: 'Libre Baskerville', serif;
    font-style: italic;
    color: white;
    letter-spacing: 2px;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    &:hover {
        opacity: 1;
    }
`

const NavInner = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

export default function Header(props) {
    return (
        <Nav>
            <NavInner>
                <Logo>FoodRecipes</Logo>
                <List>
                    <Element>
                        <a
                            href="javascript:void(0)"
                            onClick={() => {
                                props.openModal('login')
                            }}
                        >
                            Login
                        </a>
                    </Element>
                    <Element>
                        <a
                            href="javascript:void(0)"
                            onClick={() => {
                                props.openModal('register')
                            }}
                        >
                            Register
                        </a>
                    </Element>
                </List>
            </NavInner>
        </Nav>
    )
}
