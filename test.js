var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public")); 
app.listen(3001);
console.log("laat dit fucking hett odne")
