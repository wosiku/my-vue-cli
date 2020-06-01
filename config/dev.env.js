'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 将base64格式转成png格式
const baseData = require('./data.js')
const fs = require('fs');
const pngPath = 'config/image/'+ Date.now() +'.png';
const base64 = baseData.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
const dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
fs.writeFile(pngPath, dataBuffer, function(err){ //用fs写入文件
    if(err){
        console.log(err, '------------------------err');
    }else{
        console.log('写入成功！');
    }
})
// 将png或者其它格式转成base64
const path = require('path');
const mineType = require('mime-types');
let filePath = path.resolve('config/image/1586918583626.png');
let data = fs.readFileSync(filePath);
data = new Buffer(data).toString('base64');
let base64Data = 'data:' + mineType.lookup(filePath) + ';base64,' + data;
console.log(base64Data, 'base64Data')
// fs.writeFileSync(path.resolve('your/save/file/path'), base64);



module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

