const db = require('../../data/dbConfig');


const getAllUsers = async () => {
    return await db('users');
}

const getByFilter = async (filter) => {
    const user = await db('users').where(filter).first();
    return user;
}

const insertUser = async (user) => {
    const insertedUserId = await db('users').insert(user);
    return await getByFilter({id: insertedUserId}); 
}

module.exports = {
    getAllUsers,
    getByFilter,
    insertUser
}