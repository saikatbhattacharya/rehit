const awaitHelper = require('../helper/await-helper');

let counter = 0;

const retry = (api, count, timeGap, skip, onFailure) =>{
    return new Promise(async resolve => {
        const [error, data] = await awaitHelper(api);
        if(error && skip && skip!=="" && skip!==null && error[Object.keys(skip)[0]] === skip[Object.keys(skip)[0]]){
            if(error && onFailure){
                resolve(onFailure(error));
            }else{
                resolve([error, data]);
            }
        }
        else if(error && counter < count){
            setTimeout(() => {
                counter ++;
                resolve(retry(api, count, timeGap, skip, onFailure));
            }, timeGap);
        }
        else{
            if(error && onFailure){
                resolve(onFailure(error));
            }
            resolve([error, data]);
        }
    })
}

module.exports = retry;