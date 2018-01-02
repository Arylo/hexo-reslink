const npm = require("./dist/lib/npm");
const github = require("./dist/lib/github");

hexo.extend.filter.register('before_post_render', function (data){

    data.content = npm.process(data.content);
    data.content = github.process(data.content);

    return data;
});
