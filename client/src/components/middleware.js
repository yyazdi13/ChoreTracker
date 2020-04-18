// const express = require('express');
// const app = express();
// const proxy = require("http-proxy-middleware");

// module.exports = function() {
//   app.use(
//     proxy(["/api/addReward" , "/user", "/save", "/api/login", "/api/register", "/", "/api/addchore", 
//     "/api/showChores", "api/chore/:id", "/api/logout"], { target: "http://localhost:3001" })
//   );
// };

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

module.exports = function(){
    app.use('/save', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
}
app.listen(3000);