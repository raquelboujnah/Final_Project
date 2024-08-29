export const walletUpdate = async (updatedWallet: number): Promise<void> => {
    const username = localStorage.getItem('username');        
    try {
        const response = await fetch('http://localhost:5000/dog/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wallet: updatedWallet,
                username: username
            }),
        });

        const data = await response.json();
        console.log('Wallet updated in database:', data);
        localStorage.setItem('wallet_status', updatedWallet.toString())
    } catch (error) {
        console.error('Error updating wallet:', error);
    }
};

