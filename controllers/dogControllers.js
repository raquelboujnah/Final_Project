const path = require("path");
const {_userRegister, getUserByName, _getOneFunFact, _deleteFact, _updateWallet, _updatePerf} = require('../models/dogModels.js')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const userRegister = async(req, res) => {
    const { username, email, password, dog_breed, dog_name } = req.body; 

    try {
        const userInfo = await _userRegister(username, email, password, dog_breed, dog_name);
        res.status(201).json({
            message: "User registered successfullt",
            user: userInfo,
        });
    } catch (error) {
        console.log(error.code);
        if (error.code == 23505) {
            return res
            .status(200)
            .json({ messgae: "Email or Username already exist" });
        }
        res.status(500).json({ error: "internal server error" });
    }
};


const updateWallet = async(req, res) => {
    const {username, wallet} = req.body;    

    try{
        const update = await _updateWallet(wallet, username);
        if (update) {
            res.status(200).json({ message: 'Wallet is up to date' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }    
    }catch(error){
        console.log(error);
        if (error.code == 23505) {
            return res.status(409).json({ message: "Conflict" });
        }
        res.status(500).json({ error: "Internal server error" });
    };
};


const getOneFunFact = async(req, res) => {
    try{
        const funfact = await _getOneFunFact();                        
        if (funfact) {
            res.status(200).json({ message: 'Found fun fact', funfact});
        } else {
            res.status(404).json({ message: 'Fun fact do not found' });
        }    
    }catch(error){
        console.log(error);
        if (error.code == 23505) {
            return res.status(409).json({ message: "Conflict" });
        }
        res.status(500).json({ error: "Internal server error" });
    };
};

const deleteFact = async (req, res) => {
    const {id} = req.body;
    try{
        await _deleteFact(id);
        res.status(200).json({
            message: "Fun fact deleted successfullt",
        });
    } catch (error) {
        console.error('Error deleting fun fact:', error);        
        res.status(500).json({ error: "internal server error" });
    }
}


const updatePerf = async(req, res) => {
    const {username, performance} = req.body;    

    try{
        const update = await _updatePerf(performance, username);
        if (update) {
            res.status(200).json({ message: 'Performance is up to date' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }    
    }catch(error){
        console.log(error);
        if (error.code == 23505) {
            return res.status(409).json({ message: "Conflict" });
        }
        res.status(500).json({ error: "Internal server error" });
    };
};


//login with username and password, comparing the password to the hash password, handling errors...
const userLogin = async (req, res) => { 
    const { username, password } = req.body;
    

    try {
    const user = await getUserByName(username);

    if (!user) {
        return res.status(404).json({ message: "User not found..." });
    }

    const passwordMatch = await bcrypt.compare(password + "", user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed..." });
    }

    const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

    const accessToken = jwt.sign(
        { userid: user.id, email: user.email },
        ACCESS_TOKEN_SECRET,
        {expiresIn: '120s'}
    );

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        //secure: 
        maxAge: 60 * 2 * 1000,
    });


    const refreshToken = jwt.sign(
        { email: user.email },
        REFRESH_TOKEN_SECRET,
        {expiresIn: '30d'}
    );

    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        //secure: 
        maxAge: 60 * 60 * 1000 * 24 * 30, 
    });

    //   await userModel.updateToken(user.id, refreshToken);

    res.json({
        message: "Login succesfull",
        user: { register_date: user.register_date, username: user.username, dog_breed: user.dog_breed, dog_name: user.dog_name, wallet_status: user.wallet_status, performance: user.performance },
        access_token: accessToken,
        refresh_token: refreshToken
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    };
};



module.exports = {
    userRegister,
    userLogin,
    updateWallet,
    getOneFunFact,
    deleteFact,
    updatePerf
}