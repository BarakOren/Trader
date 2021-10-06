import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const HeaderContainer = styled.div`
    width: 100vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: white;
    align-items: center;
    margin-bottom: 15px;
`

const HeaderLogo = styled.p`
    font-size: 1.8vw;
`

const LinksContainer = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const HeaderItem = styled(Link)`
    font-size: 1.3vw;
    color: white;
    text-decoration: none;
`

const Header = () => {
    return(
    <HeaderContainer>
        <HeaderLogo>
            Trader
        </HeaderLogo>
        <LinksContainer>
            <HeaderItem to="/">Trader</HeaderItem>
            <HeaderItem to="/">Trader</HeaderItem>
            <HeaderItem to="/">Trader</HeaderItem>
        </LinksContainer>
    </HeaderContainer>
    )
}

export default Header;