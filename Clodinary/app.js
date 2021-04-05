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

app.get('/', async (req, res, next)=>{

    const all_image = await cloudinary.api.resources();
    const images = await all_image.resources;
    res.render('home', {images});
});

app.get('/api/upload', (req,res)=>{
    res.render('index');
})

app.post('/upload', upload.single('file') , async (req, res, next)=>{


    //console.log("file details: ", req.file);
    const result = await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto'});


    console.log("result: ", result);


    const post_details = {
        title: req.body.title,
        image: result.public_id
    }

    //res.status(200).json({post_details});
    res.redirect('/');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('Server is running on : ' + port));
