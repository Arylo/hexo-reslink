import github = require("../lib/github");

describe('Github Process', () => {

    it("left space", () => {
        const raw = "   github:foo/bar";
        const result = `   [foo/bar](https://github.com/foo/bar "Github Resource: foo/bar")`

        github.process(raw).should.be.equal(result);
    });

    it("right space", () => {
        const raw = "github:foo/bar    ";
        const result = `[foo/bar](https://github.com/foo/bar "Github Resource: foo/bar")    `;

        github.process(raw).should.be.equal(result);
    });

    it("both spaces", () => {
        const raw = "    github:foo/bar    ";
        const result = `    [foo/bar](https://github.com/foo/bar "Github Resource: foo/bar")    `;

        github.process(raw).should.be.equal(result);
    });

    it("Upper Word", () => {
        const raw = "github:Arylo/hexo-reslink";
        const result = `[Arylo/hexo-reslink](https://github.com/Arylo/hexo-reslink "Github Resource: Arylo/hexo-reslink")`;

        github.process(raw).should.be.equal(result);
    });

});