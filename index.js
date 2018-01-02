const npm = require("./dist/lib/npm");

hexo.extend.filter.register('before_post_render', function (data){

    data.content = npm.process(data.content);

    return data;
});
