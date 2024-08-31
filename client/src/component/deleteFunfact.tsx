const deleteFunfact = async (id: string | null) => {
    try {
        const response = await fetch('http://localhost:5000/dog/deletefact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Number(id)
            }),
        });        
        if (!response.ok) {
            throw new Error('Failed to delete fun fact');
        }        
        return await response.json()
    }catch(error){
        console.log(error);
        console.error('Error deleting fun fact:', error);
        throw error;
    }
};

export default deleteFunfact;