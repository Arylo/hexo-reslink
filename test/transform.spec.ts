import transform = require("../lib/transform");

describe('Transform Process', () => {

    it('Default', () => {
        const raw = `The npm:hexo is a very nice framework. Its homepage is github:hexojs/hexo.`;
        const result = `The [hexo](https://www.npmjs.com/package/hexo "Node Library: hexo") is a very nice framework. Its homepage is [hexojs/hexo](https://github.com/hexojs/hexo "Github Resource: hexojs/hexo").`;
        transform(raw).should.be.equal(result);
    });

    it("Skip Code Block", () => {
        const raw = "```\nThe npm:hexo is a very nice framework. Its homepage is github:hexojs/hexo.\n```";
        transform(raw).should.be.equal(raw);
    });

    it("Skip Code Block", () => {
        const raw = "`github:hexojs/hexo-cli`";
        transform(raw).should.be.equal(raw);
    });

});