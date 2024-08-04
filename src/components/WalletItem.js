import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const WalletItem = ({ wallet, setCurrentWallet, isActive, wallets, setWallets }) => {
	const [balances, setBalances] = useState([]);

	useEffect(() => {
		const fetchBalances = async () => {
			const balanceData = await getBalances(wallet.id);
			setBalances(balanceData.tokenBalances || []);
		};

		fetchBalances();
	}, [wallet.id]);

	const walletSelectHandler = async () => {
		const walletDetails = {
			id: wallet.id,
			blockchain: wallet.blockchain,
			accountType: wallet.accountType,
			address: wallet.address,
			balances: balances // Update balances here
		};

		localStorage.setItem('selectedWallet', JSON.stringify(walletDetails));
		window.location.reload();

		await setCurrentWallet(wallet);

		const newWallets = wallets.map((w) => ({
			...w,
			active: w.id === wallet.id,
		}));
		setWallets(newWallets);
	};

	const getBalances = async (walletId) => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
			}
		};

		try {
			const response = await fetch(`https://api.circle.com/v1/w3s/wallets/${walletId}/balances`, options);
			const data = await response.json();
			return data.data;
		} catch (error) {
			console.error('Error:', error);
			return { tokenBalances: [] };
		}
	};

	const handleFundMe = async () => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_CIRCLE_API_KEY}`
			},
			body: JSON.stringify({
				address: wallet.address,
				blockchain: 'MATIC-AMOY',
				native: false,
				usdc: true,
				eurc: false
			})
		};

		try {
			const response = await fetch('https://api.circle.com/v1/faucet/drips', options);
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<WalletItemContainer onClick={walletSelectHandler} isActive={isActive}>
			<WalletDescription>
				<H1>
					<StatusIndicator state={wallet.state} />
					{wallet.blockchain} : {wallet.accountType}
				</H1>
				<H2>{wallet.address}</H2>
				{balances.length > 0 && (
					<BalanceList>
						{balances.map((balance) => (
							<BalanceItem key={balance.token.id}>
								<span>{balance.token.symbol}</span>: <span>{balance.amount}</span>
							</BalanceItem>
						))}
					</BalanceList>
				)}
				<FundButton onClick={(e) => { e.stopPropagation(); handleFundMe(); }}>
					Fund Me
				</FundButton>
			</WalletDescription>
		</WalletItemContainer>
	);
};

const WalletItemContainer = styled.div`
	padding: 0 2rem;
	height: 100px;
	width: 100%;
	display: flex;
	transition: all 0.3s ease;
	background-color: ${(p) => (p.isActive ? "pink" : "white")};
	cursor: pointer;
	&:hover {
		background-color: lightblue;
	}
`;

const WalletDescription = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const H1 = styled.h3`
	padding-left: 1rem;
	font-size: 1rem;
	display: flex;
	align-items: center;
`;

const H2 = styled.h4`
	padding-left: 1rem;
	font-size: 0.7rem;
`;

const blinkGreen = keyframes`
	0% { opacity: 1; }
	50% { opacity: 0; }
	100% { opacity: 1; }
`;

const blinkRed = keyframes`
	0% { opacity: 1; }
	50% { opacity: 0; }
	100% { opacity: 1; }
`;

const StatusIndicator = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${(props) => (props.state === "LIVE" ? "green" : "red")};
	animation: ${(props) => (props.state === "LIVE" ? blinkGreen : blinkRed)} 1s infinite;
	margin-right: 10px;
`;

const BalanceList = styled.div`
	padding-left: 1rem;
`;

const BalanceItem = styled.div`
	font-size: 0.8rem;
`;

const FundButton = styled.button`
	margin-top: 0.5rem;
	padding: 0.5rem 1rem;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 0.8rem;
	&:hover {
		background-color: #0056b3;
	}
`;

export default WalletItem;
