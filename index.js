const transform = require("./dist/lib/transform");

hexo.extend.filter.register('before_post_render', function (data) {

    data.content = transform(data.content);

    return data;
});
