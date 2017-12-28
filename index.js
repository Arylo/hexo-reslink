import { process } from "./dist/lib/npm"

hexo.extend.filter.register('before_post_render', function (data){

    data.content = process(data.content);

    return data;
});
