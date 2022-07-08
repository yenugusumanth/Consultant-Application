//importing the axios package
const axios = require('axios');

//creating the axios config instance using the create function in axios package
const instance = axios.create({

//declaring the base URL which is common for all URL's
 baseURL: "http://172.20.10.2:12345/",

 //specifying the timeout for the request
 timeout: 15000, // in millisecondsse

 //specifying the headers accept and content type for the request
 headers: {
 'Content-Type': 'application/json',
 'Accept': 'application/json',
 },
})
 
//exporting the instance
export default instance;