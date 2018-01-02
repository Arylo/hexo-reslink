import npm = require("./npm");
import github = require("./github");
import { isArray } from "util";
const parse = require("markdown-to-ast").parse;

interface IBlock {
    type: string;
    raw: string;
    children?: IBlock[];
    range: [number, number];
    loc: {
        start: { line: number, column: number },
        end: { line: number, column: number }
    };
}

export = (content: string) => {

    const ast: IBlock = parse(content);
    let newContent = "";

    const tranChildren = (block: IBlock) => {
        let text = block.raw;
        if (block.children && isArray(block.children)) {
            for (let b of block.children) {
                tranChildren(b);
            }
            return;
        }
        if (block.type === "CodeBlock" || block.type === "Code") {
            newContent += text;
            return;
        }
        text = npm.process(text);
        text = github.process(text);
        newContent += text;
    };

    tranChildren(ast);

    return newContent;
};