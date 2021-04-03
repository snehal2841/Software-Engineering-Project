// const http = require('http');
// const util = require('util');
// const Formidable = require('formidable');
// const cloudinary = require("cloudinary").v2;
// require('dotenv').config()


// cloudinary.config({
//     cloud_name: "snailzzz",
//     api_key: "346851894666597",
//     api_secret: "LInuPFuAMvTPpEf2vhAqOJZBJbA"
// });

// http.createServer((req, res) => {
//     if (req.url === '/upload' && req.method.toLowerCase() === 'post') {

//         const form = new Formidable();

//         form.parse(req, (err, fields, files) => {

//             cloudinary.uploader.upload(files.upload.path ,{resource_type: "video"}, (err, result) => {
//                 console.log(result)
//                 if (result.public_id) {
//                     //res.render('views/index.ejs')
//                     res.writeHead(200, { 'content-type': 'text/plain' });
//                     res.write('received upload:\n\n');
//                     res.end(util.inspect({ fields: fields, files: files }));
//                 }
//             } 
//             );
//         });
//         return;
//     }

//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.end(`
//     <form action="/upload" enctype="multipart/form-data" method="post">
//       <input type="text" name="title" /><br/>
//       <input type="file" name="upload" multiple="multiple" /><br/>
//       <input type="submit" value="Upload" />
//     </form>
//   `);

// }).listen(8080);



// ************************************************************************************************************


// const express = require('express');
// const app = express();
// const Formidable = require('formidable');
// const util = require('util');
// const cloudinary = require("cloudinary").v2;
// require('dotenv').config()

// app.set('view engine', 'ejs');

// cloudinary.config({
//     cloud_name: "snailzzz",
//     api_key: "346851894666597",
//     api_secret: "LInuPFuAMvTPpEf2vhAqOJZBJbA"
// });

// app.get('/', (req,res) =>{
//     const all_videos =  cloudinary.api.resources();
//     console.log(all_videos);
//     const video =  all_videos.resources;
//     console.log(video);
//     res.render('index')
// });

// app.post('/', (req,res) =>{
    
//     const form = new Formidable();
//     form.parse(req, (err, fields, files) => {

//         cloudinary.uploader.upload(files.upload.path ,{resource_type: "video"}, (err, result) => {
//             console.log(result)
//             if (result.public_id) {
//                     //res.writeHead(200, { 'content-type': 'text/plain' });
//                     res.write('received upload:\n\n');
//                     res.end(util.inspect({ fields: fields, files: files }));
//                 }
//             });
//         });
//         return;
// });


// let port = process.env.PORT || 8080
// app.listen(port, process.env.IP, () => {
//     console.log("showing on port 8080.");
// });

// ************************************************************************************************************


require('dotenv').config();

const express = require('express');
const upload = require("./utils/multer");
const {cloudinary} = require("./utils/cloudinary");
const { all } = require('async');

const app = express();






app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req,res) =>{
    res.render('home');
})

app.get('/api/upload', async (req, res, next)=>{
    // SINGLE IMAGE 
    // const single_image = await cloudinary.api.resources();
    // console.log(single_image.resources[0].public_id);


    // const single_image = await cloudinary.api.resource("yqxprxoayhnhjtdmnpsi");
    // console.log(single_image);
    // https://cloudinary.com/documentation/admin_api#get_resources
    const all_image = await cloudinary.api.resources();
    //console.log(all_image);
    const images = await all_image.resources;
    //console.log(images);

    res.render('index', {images});
});

app.post('/api/upload', upload.single('img') , async (req, res, next)=>{


    //console.log("file details: ", req.file);

    // cloudinary.v2.uploader.upload(file, options, callback);
    const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto'});


    console.log("result: ", result);


    const post_details = {
        title: req.body.title,
        image: result.public_id
    }

    res.status(200).json({post_details});
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('Server is running on : ' + port));
