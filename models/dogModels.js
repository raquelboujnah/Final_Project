const sql = require('../config/db.js');
const bcrypt = require("bcrypt");

//hasing the password and insert the data user from the form to the table, after handling errors 
const _userRegister = async(username, email, user_password, dog_breed, dog_name) => {
  try{
    const now = new Date();
    const register_date = now.toISOString().split('T')[0];      
    const wallet_status = 0;
    const performance = 0
    const password = await bcrypt.hash(user_password + '', 10);
    return sql("users")
    .insert({register_date, username, email, password, dog_breed, dog_name, wallet_status, performance}, ["id", "register_date", "username", "email", "password", "dog_breed", "dog_name", 'wallet_status', "performance"]);
  }catch(error){
    console.log(error);
    
  }
}
    

const getUserByName = async (username = "") => {
    try {
      const user = await sql("users")
        .select("register_date", "username", "password", "dog_breed", "dog_name", 'wallet_status', 'performance')
        .where("username", username)
        .first();
      return user;
    } catch (error) {
      console.log(error);
      ;
    }
};

const _getOneFunFact = async () => {
  try {
      const funfact = await sql('fun_facts')
          .select("id", "funfacts")
          .orderByRaw('RANDOM()')
          .limit(1);
      return funfact[0];      
  } catch (error) {
      throw error;
  };
};

const _deleteFact = async (id) => {
  try{
    const factToDelete = await sql('fun_facts')
    .where('id', id)
    .del();
    return factToDelete
  }catch(error){
    throw error;
  };
};

const _updateWallet = (wallet, username) => {
  try {
    return sql('users')
    .update({wallet_status: wallet})
    .where('username', username)
  } catch (error) {
    throw error;
  };
};

const _updatePerf = (performance, username) => {
  try {
    return sql('users')
    .update({performance: performance})
    .where('username', username)
  } catch (error) {
    throw error;
  };
};


// const _updateWallet = async (wallet, name) => {
//   try {
//     const user = await sql('users')
//     .update({wallet_status: wallet})
//     .where('name', name)
//     return user
//   } catch (error) {
//     throw error;
    
//   }
// }

module.exports = {
    _userRegister,
    getUserByName,
    _getOneFunFact,
    _deleteFact,
    _updateWallet,
    _updatePerf
}