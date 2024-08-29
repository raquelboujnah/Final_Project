export const perfUpadte = async (updatedPerf: number): Promise<void> => {
    const username = localStorage.getItem('username');                
    try {
        const response = await fetch('http://localhost:5000/dog/performance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                performance: updatedPerf,
                username: username
            }),
        });

        const data = await response.json();
        console.log('Performance updated in database:', data);
        localStorage.setItem('performance', updatedPerf.toString())
        return data
    } catch (error) {
        console.error('Error updating perfomance:', error);
    }
};




