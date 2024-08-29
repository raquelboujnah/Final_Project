const axios = require('axios');
const db = require("./db.js");

const url = 'https://dogapi.dog/api/v1/facts?number=5';

const funfactData = [];

const fetchApi = async (url, data) => {
    try{
        const res = await axios.get(url)
        const funfact = res.data;
        data.push(...funfact);
    }catch(err){
        console.error('Error fetching exercises:', err);
    };
};

const insertData = async (table, data) => {
    try{
        await db(table).insert(data);    
    }catch(err){
        console.error('Error inserting exercise:', err);
    }
};

const fetchAll = async () => {
    await Promise.all([
        fetchApi(url, funfactData),
        fetchApi(url, funfactData),
        fetchApi(url, funfactData),
        fetchApi(url, funfactData),
        fetchApi(url, funfactData),
        fetchApi(url, funfactData),
    ]);
    console.log("All funfacts fetched.")
    await insertData('fun_facts', funfactData)
};

module.exports = {fetchAll}