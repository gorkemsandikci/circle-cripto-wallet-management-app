import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav";
import Credit from "./components/Credit";
import Wallet from "./components/Wallet";
import WalletItemDetail from "./components/WalletItemDetail";

const App = () => {

	const [currentWallet, setCurrentWallet] = useState(null); // Güncellendi: state eklendi
	const [walletStatus, setWalletStatus] = useState(false);

	useEffect(() => {
		// localStorage'dan wallet verilerini oku ve state'e set et
		const storedWallet = localStorage.getItem('selectedWallet');
		if (storedWallet) {
			setCurrentWallet(JSON.parse(storedWallet));
		}
	}, []);

	const handleSetCurrentWallet = (wallet) => {
		setCurrentWallet(wallet);
		localStorage.setItem('selectedWallet', JSON.stringify(wallet));
	};

	return (
		<AppContainer walletStatus={walletStatus}>
			<Nav walletStatus={walletStatus} setWalletStatus={setWalletStatus} />

			<WalletDetailContainer>
				<WalletItemDetail currentWallet={currentWallet} />
			</WalletDetailContainer>

			<Wallet
				setCurrentWallet={setCurrentWallet} // Güncellendi: setCurrentWallet fonksiyonu eklendi
				walletStatus={walletStatus}
			/>
			<Credit />

		</AppContainer>
	);
};

const AppContainer = styled.div`
	transition: all 0.5s ease;
	margin-left: ${(p) => (p.walletStatus ? "20rem" : "0")};
	@media screen and (max-width: 768px) {
		margin-left: 0;
	}
`;

const WalletDetailContainer = styled.div`
	flex: 1;
	border-left: 1px solid #ddd;
	padding: 1rem;
	background-color: #f9f9f9;
`;

export default App;
