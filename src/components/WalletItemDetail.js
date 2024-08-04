import React from "react";
import styled from "styled-components";

const WalletItemDetail = ({ currentWallet }) => {
	return (
		<DetailContainer>
			{currentWallet ? (
				<>
					<Header>
						<Title>{currentWallet.blockchain || 'Unknown Blockchain'}</Title>
						<Subtitle>{currentWallet.accountType || 'Unknown Type'}</Subtitle>
					</Header>
					<Address>Address: {currentWallet.address || 'No address available'}</Address>
					<Address>Wallet ID: {currentWallet.id || 'No address available'}</Address>
					{currentWallet.balances && currentWallet.balances.length > 0 ? (
						<BalanceList>
							{currentWallet.balances.map((balance) => (
								<BalanceItem key={balance.token.id}>
									<UnderSubtitle>{balance.token.id || 'Unknown Type'}</UnderSubtitle>
									<TokenSymbol>{balance.token.symbol || 'Unknown Token'}</TokenSymbol>
									<Amount>{balance.amount || '0'}</Amount>
								</BalanceItem>
							))}
						</BalanceList>
					) : (
						<NoBalances>No balances available</NoBalances>
					)}
				</>
			) : (
				<Placeholder>Select a wallet to view details</Placeholder>
			)}
		</DetailContainer>
	);
};

const DetailContainer = styled.div`
	padding: 2rem;
	background-color: #fff;
	border-left: 1px solid #ddd;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
	margin-bottom: 1rem;
`;

const Title = styled.h1`
	font-size: 1.5rem;
	color: #333;
	margin: 0;
`;

const Subtitle = styled.h2`
	font-size: 1.2rem;
	color: #666;
	margin: 0;
`;

const UnderSubtitle = styled.h2`
	font-size: 0.6rem;
	color: #666;
	margin: 0;
`;

const Address = styled.p`
	font-size: 0.9rem;
	color: #444;
	margin: 0.5rem 0;
`;

const BalanceList = styled.div`
	margin-top: 1rem;
`;

const BalanceItem = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 0;
	font-size: 0.9rem;
	color: #333;
	border-bottom: 1px solid #eee;
`;

const TokenSymbol = styled.span`
	font-weight: bold;
`;

const Amount = styled.span`
	color: #007bff;
`;

const NoBalances = styled.p`
	font-size: 0.9rem;
	color: #999;
	margin: 1rem 0;
`;

const Placeholder = styled.p`
	font-size: 1rem;
	color: #888;
	text-align: center;
	margin-top: 2rem;
`;

export default WalletItemDetail;
