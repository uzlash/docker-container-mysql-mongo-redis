const express = require('express');
const UserDao = require('../dao/dao.user');

const client = require('../connections/connection.redis')();

const REDIS_KEY = 'users';

function fetchFromRedis() {
    return new Promise((resolve, reject) => {
        client.get(REDIS_KEY, (err, result) => {
            if (err) {
                reject(err);
                console.log('from cache err >> ', err);
            } else {
                resolve(JSON.parse(result));
                console.log('from cache result >> ', result);
            }
        });
    });
}

function saveToRedis(arr) {
    return new Promise((resolve, reject) => {
        client.set(REDIS_KEY, JSON.stringify(arr), (err, result) => {
            if (err) {
                reject(err);
                console.log('to cache err >> ', err);
            } else {
                resolve(true);
                console.log('to cache result >> ', result);
            }
        });
    });
}

module.exports = () => {
    const api = express.Router();

    ///////////////////////
    //START TEST ROUTES
    //////////////////////

    //Create User using MongoDB
    api.post('/mongo', async (req, res) => {
        try {
            const savedUser = await UserDao.addNew(req.body);
            res.status(200).json({ status: 'success', payload: savedUser, message: 'User created successfully!', db: 'mongodb' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });
    //Get User from MongoDB
    api.get('/mongo', async (req, res) => {
        try {
            const usersArray = await UserDao.getAll();
            res.status(200).json({ status: 'success', payload: usersArray, message: 'All Users fetched successfully', db: 'mongodb'});
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });
    //Create Record Using Redis
    api.post('/redis', async (req, res) => {
        try {
            const savedUser = await saveToRedis(req.body)
            res.status(200).json({ status: 'success', payload: savedUser, message: 'User created successfully!', db: 'redisdb' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });
    //Get Record From Redis
    api.get('/redis', async (req, res) => {
        try {
            const savedUser = await fetchFromRedis()
            const updatedUser = await saveToRedis(savedUser)
            res.status(200).json({ status: 'success', payload: updatedUser, message: 'Users fetched successfully', db: 'redisdb' });
        } catch (err) {
            res.status(500).json({ status: 'failed', payload: null, message: err });
        }
    });

    ///////////////////////
    //END TEST ROUTES
    //////////////////////

    return api;
}