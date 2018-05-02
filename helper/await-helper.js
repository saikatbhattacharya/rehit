module.exports = function promiseHandler(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
 }