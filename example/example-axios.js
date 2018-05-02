const axios = require('axios');
const retry = require('../lib');

//Simple retry- retry five times with 1 sec interval
const simpleRetry = async () => {
    const [apiError, apiRes] = await retry(axios.get('http://goog1234525.com'), 5, 1000);
    console.log(apiError, apiRes);  
}

//skip some case
const skipRetry = async () => {
    const [apiError, apiRes] = await retry(axios.get('http://goog1234525.com'), 5, 1000, {code: 'ENOTFOUND'});
    console.log(apiError, apiRes);
}

//on-failure after retry 
const onFailureRetry = () => {
    retry(axios.get('http://goog1234525.com'), 5, 1000, {code: 'ENOTFOUND'}, (error) => {
        console.log(error.code);
    })
}

onFailureRetry();