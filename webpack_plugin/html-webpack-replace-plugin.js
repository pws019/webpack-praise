const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', './log');
function HtmlWebpackReplacePlugin(options) {
}

function to(str) {
	return str.replace(/([A-Z])/g,"-$1").toLowerCase();
}




function writeFile(name, data) {
  if(typeof data === 'object') 
    data.event = name;
    data = JSON.stringify(data, null, 4);
  fs.writeFile(`${dir}/${name}.json`,data,{flag:'w',encoding:'utf-8',mode:'0666'},function(err){
    if(err){
        console.log("文件写入失败")
        console.log(err);
    }else{
        console.log("文件写入成功");
    }
  }) 
}

function listen(arr,comp) {
  arr.forEach(item => {
    item = to(item);
    comp.plugin(item, function(data, callback){
      writeFile(item, data);
      callback(null, data);
    })
  })
}

HtmlWebpackReplacePlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    // listen(['htmlWebpackPluginBeforeHtmlGeneration','htmlWebpackPluginBeforeHtmlProcessing',
    // 'htmlWebpackPluginAlterAssetTags','htmlWebpackPluginAfterHtmlProcessing','htmlWebpackPluginAfterEmit'], compilation);
    compilation.plugin('html-webpack-plugin-before-html-processing', function(data, callback){
      let html = data.html;
      const scripts = data.assets.js.map(item => `<script src="${item}"></script>`).join('\n');
      const css = data.assets.css.map(item => `<link rel="stylesheet" type="text/css" href="${item}">`).join('\n');
      html = html.replace('<!--script-->', scripts);
      html = html.replace('<!--css-->', css);
      data.html = html;
      data.plugin.options.inject = false;
      writeFile('test', data);
      callback(null, data);
    })
  });
}

module.exports = HtmlWebpackReplacePlugin