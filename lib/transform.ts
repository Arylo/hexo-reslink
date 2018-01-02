import npm = require("./npm");
import github = require("./github");
const parse = require("markdown-to-ast").parse;

export = (content: string) => {

    const ast = parse(content);

    content = npm.process(content);
    content = github.process(content);

    return content;
};