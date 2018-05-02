# Rehit
Retry mechanism is now option rich, easy to plugin and supporting all new NodeJS features.

## Installation
```
npm install rehit
```
## Usage
```
//Packages
const rehit = require('rehit');
const axios = require('axios');

//Simple retry- retry five times with 1 sec interval
const simpleRehit = async () => {
    const [apiError, apiRes] = await rehit(axios.get('http://goog1234525.com'), 5, 1000);
    console.log(apiError, apiRes);  
}

//skip some case
const skipRehit = async () => {
    const [apiError, apiRes] = await rehit(axios.get('http://goog1234525.com'), 5, 1000, {code: 'ENOTFOUND'});
    console.log(apiError, apiRes);
}

//on-failure after retry 
const onFailureRehit = () => {
    rehit(axios.get('http://goog1234525.com'), 5, 1000, {code: 'ENOTFOUND'}, (error) => {
        console.log(error.code);
    })
}

```
## API
```
rehit(api: Promise, count: Number, time: Number, skip: Object, onFailure: Function) => Array
```
- ``` api ``` : The api request should be sent in a promisified manner. For example: ```  axios.get('http://goog1234525.com') ``` .
- ``` count ``` : This is the number of retries. Just the number is to be passed. Ex. ``` 5 ``` .
- ``` time ``` : This is the time interval (in ms) between two API request to retry. Ex. ``` 1000 ``` for 1s interval.
- ``` skip ``` : This is an Object with single key-value pair. The key should be one of the keys of the expected error object. For example, if we pass ``` {code: 'ENOTFOUND'} ``` it will not retry further on getting error having {code: 'ENOTFOUND'}.
- ``` onFailure ``` : This is a fail over mechanism. One is to define a function what is to be called on the exhaustion of all the retries and api is still returning error. 

## Author
Saikat Bhattacharya ( @saikatbhattacharya )
