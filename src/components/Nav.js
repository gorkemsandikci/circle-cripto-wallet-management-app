import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import WalletButton from "./WalletButton";
import {faWallet} from "@fortawesome/free-solid-svg-icons/faWallet";

const Nav = ({walletStatus, setWalletStatus}) => {
    return (
        <NavContainer>
            <H1 walletStatus={walletStatus}>Circle Chain My Wallet App</H1>
            <Button onClick={() => setWalletStatus(!walletStatus)}>
                My Wallet
                <FontAwesomeIcon icon={faWallet}/>
            </Button>
            <WalletButton/>
        </NavContainer>
    );
};

const NavContainer = styled.div`
    min-height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 768px) {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
    }
`;

const H1 = styled.h1`
    transition: all 0.5s ease;

    @media screen and (max-width: 768px) {
        visibility: ${(p) => (p.walletStatus ? "hidden" : "visible")};
        opacity: ${(p) => (p.walletStatus ? "0" : "100")};
        transition: all 0.5s ease;
    }
`;

const Button = styled.button`
    background: transparent;
    cursor: pointer;
    border: 2px solid rgb(65, 65, 65);
    padding: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgb(65, 65, 65);
        color: white;
    }
`;

export default Nav;
