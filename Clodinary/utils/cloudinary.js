const cloudinary = require('cloudinary').v2;



cloudinary.config({
    cloud_name: 'snailzzz',
    api_key: '346851894666597',
    api_secret: 'LInuPFuAMvTPpEf2vhAqOJZBJbA'
});



module.exports = {cloudinary};