const download = require('image-downloader');
const path = require('path');
const fs = require('fs');
const resizeImg = require('resize-img');

module.exports = async (req,res,next) => {
    let ext = path.extname(req.body.url);
    const options = {
        url: req.body.url,
        dest: './public/images/'
    };
    if(ext === '.jpeg' || ext === '.jpg' || ext ==='.png' || ext === '.bmp' ) {
        console.log('image')
        download.image(options)
            .then(({ filename }) => {
                console.log('download')
                resizeImg(
                    fs.readFileSync(filename),
                    {width: 50, height: 50}
                ).then((buf) => {
                    let fName = filename.split("\\");
                    let finalName = fName.pop();
                    console.log(finalName);
                    try {        
                    fs.writeFileSync("./public/images/thumbnails/" + finalName, buf);
                    res.json({
                        message : "Successfully saved"
                    });
                    next();
                }
                    catch(err) {
                        console.log(err)
                        res.status(501).send('serverside inside')
                    }
                }).catch(err => {
                    console.log(err)
                    res.status(501).send('serverside inside')
                })
            }).catch(err => {
                console.log(err)
                res.status(501).send('serverside outside')
            })
    } else {
        res.status(403);
        res.json ({
            Message : "Image extensions allowed -> jpg,jpeg,bmp,png"
        })
    }
};