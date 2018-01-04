import npm = require("./npm");
import github = require("./github");
import { isArray } from "util";
const parse = require("markdown-to-ast").parse;
const toMd = require("ast-to-markdown");

interface IBlock {
    type: string;
    raw: string;
    value?: string;
    children?: IBlock[ ];
    range: [ number, number ];
    loc: {
        start: { line: number, column: number },
        end: { line: number, column: number }
    };
}

export = (content: string) => {

    const ast: IBlock = parse(content);

    const tranChildren = (block: IBlock) => {
        let text = block.raw;
        if (block.children && isArray(block.children)) {
            let lastLine = block.loc.start.line;
            let newRaw = "";
            for (let b of block.children) {
                b = tranChildren(b);
            }
            for (let b of block.children) {
                const startLine = block.loc.start.line;
                const endLine = block.loc.end.line;
                if (startLine === lastLine) {
                    newRaw += b.raw;
                    continue;
                }
                for (let i = 0; i < (startLine - lastLine); i++) {
                    newRaw += "\n";
                }
                newRaw += b.raw;
                lastLine = endLine;
            }
            block.raw = newRaw;
            return block;
        }
        if (block.type === "CodeBlock" || block.type === "Code") {
            return block;
        }

        text = npm.process(text);
        text = github.process(text);

        block.raw = text;
        if (block.value) {
            block.value = text;
        }
        return block;
    };

    return toMd(tranChildren(ast)).replace(/(^\n|\n$)/g, "");
};