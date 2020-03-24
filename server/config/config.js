var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');
module.exports = function(app){ 
    app.use(bodyParser({limit: '50mb'}));
    app.use(bodyParser.urlencoded({extended:true,limit: '50mb'}));
    
    app.use(bodyParser());
    app.use(fileUpload());
    app.use(cors());
}