import React, { useState, useEffect } from "react";
import WalletItem from "./WalletItem";
import styled from "styled-components";

const Wallet = ({ walletStatus }) => {
	const [wallets, setWallets] = useState([]);
	const [currentWallet, setCurrentWallet] = useState(null);

	useEffect(() => {
		const fetchWallets = async () => {
			const userId = localStorage.getItem("userId");
			const apiKey = process.env.REACT_APP_CIRCLE_API_KEY;
			if (!userId) {
				console.error("User ID is not found in localStorage.");
				return;
			}
			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`
				}
			};
			try {
				const response = await fetch(`https://api.circle.com/v1/w3s/wallets?userId=${userId}`, options);
				const data = await response.json();
				setWallets(data.data.wallets);
			} catch (error) {
				console.error("Error fetching wallets:", error);
			}
		};
		fetchWallets();
	}, []);

	return (
		<WalletContainer walletStatus={walletStatus}>
			<H1>Wallets</H1>
			<WalletItemContainer>
				{wallets.map((wallet) => (
					<WalletItem
						wallet={wallet}
						setCurrentWallet={setCurrentWallet}
						isActive={currentWallet?.id === wallet.id}
						wallets={wallets}
						setWallets={setWallets}
						key={wallet.id}
					/>
				))}
			</WalletItemContainer>
		</WalletContainer>
	);
};

const WalletContainer = styled.div`
	position: fixed;
	z-index: 9;
	top: 0;
	left: 0;
	width: 20rem;
	height: 100%;
	background-color: white;
	box-shadow: 2px 2px 50px rgb(204, 204, 204);
	user-select: none;
	overflow: scroll;
	transition: all 0.5s ease;
	opacity: ${(p) => (p.walletStatus ? "100" : "0")};
	scrollbar-width: thin;
	scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(155, 155, 155, 0.5);
		border-radius: 20px;
		border: transparent;
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		z-index: 9;
	}
`;

const WalletItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
`;

const H1 = styled.h2`
	padding: 2rem;
`;

export default Wallet;
