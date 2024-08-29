const funFact = async () => {
    try {
        const response = await fetch('http://localhost:5000/dog/funfacts', {
            method: 'GET',
        });
        const result = await response.json();                        
        return result.funfact
    } catch (error) {
        console.error('Error getting data:', error);
    }
}


export default funFact; 