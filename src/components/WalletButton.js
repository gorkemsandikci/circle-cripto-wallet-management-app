import React, {useCallback, useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {createUser} from "../api/createUser";
import {acquireSessionToken} from "../api/acquireSessionToken";
import {initializeUser} from "../api/initializeUser";
import {getAppId} from "../api/getAppId";
import {W3SSdk} from "@circle-fin/w3s-pw-web-sdk"

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgb(65, 65, 65);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: ${spin} 1s linear infinite;
    margin: 10px auto;
`;

const ButtonContainer = styled.div``;

const StyledButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    border: 2px solid rgb(65, 65, 65);
    padding: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
        background: rgb(65, 65, 65);
        color: white;
    }
`;

const Message = styled.div`
    margin-top: 1rem;
    color: ${props => props.error ? 'red' : 'green'};
    text-align: center;
`;

const FormContainer = styled.div`
    padding: 1rem;
    background-color: white;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const WalletButton = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [sdk, setSdk] = useState(null);
    const [canVerify, setCanVerify] = useState(false);

    useEffect(() => {
        setSdk(new W3SSdk());

        const checkLocalStorage = () => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('userToken');
            const encryptionKey = localStorage.getItem('encryptionKey');
            const challengeId = localStorage.getItem('challengeId');
            setCanVerify(userToken && encryptionKey && userId && challengeId);
        };

        checkLocalStorage();

        checkLocalStorage();

        window.addEventListener('storage', checkLocalStorage);

        return () => {
            window.removeEventListener('storage', checkLocalStorage);
        };
    }, []);

    const handleSubmit = useCallback(() => {
        const appId = localStorage.getItem('appId');
        const userToken = localStorage.getItem('userToken');
        const encryptionKey = localStorage.getItem('encryptionKey');
        const challengeId = localStorage.getItem('challengeId');
        if (sdk) {
            sdk.setAppSettings({appId});
            sdk.setAuthentication({userToken, encryptionKey});
            sdk.execute(challengeId, (error, result) => {
                if (error) {
                    console.log(`${error?.code?.toString() || 'Unknown code'} : ${error?.message ?? 'Error!'}`);
                    return;
                }
                if (result.data) {
                    console.log(`signature: ${result.date?.signature}`);
                }
            });
        }
    }, [sdk]);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const checkLocalStorageForInitialization = () => {
        const userId = localStorage.getItem('userId');
        const userToken = localStorage.getItem('userToken');
        const encryptionKey = localStorage.getItem('encryptionKey');
        const challengeId = localStorage.getItem('challengeId');
        return userToken && encryptionKey && userId && challengeId;
    };

    const handleCreateWallet = async () => {
        setIsCreating(true);
        setMessage('Checking wallet status...');
        setLoading(true);

        const userId = localStorage.getItem('userId');

        if (!userId) {
            setMessage('Creating user...');
            try {
                const result = await createUser();
                if (result) {
                    console.log('User created successfully. User ID: ', result.userId);
                    localStorage.setItem('userId', result.userId);
                    localStorage.setItem('status', result.status);

                    await delay(2000);

                    setMessage('User created. Acquiring session token...');

                    const sessionResult = await acquireSessionToken();
                    if (sessionResult) {
                        console.log('Session token acquired successfully.');
                        setMessage('Session token acquired successfully.');

                        await delay(2000);
                        const getAppIdResult = await getAppId();
                        if (getAppIdResult) {
                            localStorage.setItem('appId', getAppIdResult.appId);
                            console.log('Retrieved App ID successfully.');
                            setMessage('APP ID Retrieved successfully.')
                            setIsInitializing(true);
                            setCanVerify(true);
                        } else {
                            setMessage('Failed to APP ID retrieved!');
                        }
                    } else {
                        setMessage('Failed to acquire session token.');
                    }
                } else {
                    setMessage('Failed to create user.');
                }
            } catch (error) {
                console.error('Error in wallet creation process: ', error);
                setMessage('An error occurred. Please try again.');
            }
        } else if (checkLocalStorageForInitialization()) {
            setIsInitializing(true);
        } else {
            setMessage('Wallet exists. Acquiring session token...');
            try {
                const sessionResult = await acquireSessionToken();
                if (sessionResult) {
                    console.log('Session token acquired successfully.');
                    setMessage('Session token acquired successfully.');
                    setIsInitializing(true);
                    setCanVerify(true);
                } else {
                    setMessage('Failed to acquire session token.');
                }
            } catch (error) {
                console.error('Error acquiring session token: ', error);
                setMessage('An error occurred while acquiring session token.');
            }
        }
        setLoading(false);
        setIsCreating(false);
    };

    const handleInitializeUser = async () => {
        setIsCreating(true);
        setMessage('Initializing user...');
        setLoading(true);

        try {
            const initializeResult = await initializeUser();
            if (initializeResult) {
                setMessage('User initialized successfully.');
                localStorage.setItem('challengeId', initializeResult.challengeId);
                setCanVerify(true);
            } else {
                setMessage('Failed to initialize user.');
            }
        } catch (error) {
            console.error('Error initializing user: ', error);
            setMessage('An error occurred while initializing user.');
        }

        setLoading(false);
        setIsCreating(false);
    };

    return (
        /*<ButtonContainer>
            <StyledButton
                onClick={isInitializing ? handleInitializeUser : handleCreateWallet}
                disabled={isCreating}>
                {isInitializing ? 'Initialize Now' : (isCreating ? 'Processing...' : 'Create or Acquire Wallet')}
            </StyledButton>
            {loading && <Loader/>}
            {message && <Message>{message}</Message>}
            {canVerify && <StyledButton onClick={handleSubmit}>Verify Challenge</StyledButton>}
        </ButtonContainer>
         */
        <ButtonContainer>
            {!isInitializing && !canVerify && (
                <StyledButton
                    onClick={handleCreateWallet}
                    disabled={isCreating}>
                    {isCreating ? 'Processing...' : 'Create or Acquire Wallet'}
                </StyledButton>
            )}
            {isInitializing && (
                <StyledButton
                    onClick={handleInitializeUser}
                    disabled={isCreating}>
                    {isCreating ? 'Processing...' : 'Initialize Now'}
                </StyledButton>
            )}
            {loading && <Loader />}
            {message && <Message>{message}</Message>}
            {canVerify && <StyledButton onClick={handleSubmit}>Verify Challenge</StyledButton>}
        </ButtonContainer>
    );
};

export default WalletButton;
