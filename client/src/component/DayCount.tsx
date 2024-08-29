export const displayDayNum = (): number => {
        const register_date = localStorage.getItem('register_date');
        if(register_date){
            let registerDateObject = new Date(register_date);
            let currentDate = new Date();
            let timeDifference = currentDate.getTime() - registerDateObject.getTime();
            let daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));            
            return daysPassed + 1
            
        }else{
            console.error("No register_date found in localStorage");
            return -1
        }; 
    };

