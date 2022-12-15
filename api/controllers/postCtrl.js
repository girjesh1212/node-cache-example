const express = require('express');
const axios = require('axios');
const { cache1, cache2 } = require('../../cache');

module.exports.test = (req, res) => {
    return res.status(200).json({ msg: 'Test route works' });
}

// First look into cache, if the requested data is present, 
// return it from cache otherwise fetch the data and store it in cache for the next time.
module.exports.fetch = async (req, res) => {

    // Check if the requested data exists in redis.
    try {
        const data = cache1.get('data');
        if (data) {
            console.log('Cache hit');
            return res.status(200).json(JSON.parse(data));
        }
    } catch (err) {
        return res.json(500).json({ msg: 'Oops! Something broke on server side' });
    }

    // If not exist, cache miss condition
    console.log('Cache miss');

    // Fetch the data by calling the url 
    axios.get('https://jsonplaceholder.typicode.com/posts', {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
        .then(async function (response) {

            // Save the response in redis for next request
            try {
                cache1.set('data', JSON.stringify(response.data));    // SET key for 10 seconds
            } catch (err) {
                return res.json(500).json({ msg: 'Oops! Something broke on server side' });
            }

            // Send the response as json
            return res.json(response.data);
        })
        .catch(function (error) {
            return res.status(500).json(error);
        });
}
