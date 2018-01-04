import npm = require("./npm");
import github = require("./github");
import { isArray } from "util";
const parse = require("markdown-to-ast").parse;

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

        if (block.children && isArray(block.children)) {
            for (let bi = 0; bi < block.children.length; bi++) {
                const b = block.children[bi];
                block.children[bi] = tranChildren(b);
            }
            // Supply \n
            for (let bi = 0; bi < block.children.length; bi++) {
                if (bi === 0) {
                    continue;
                }
                const b = block.children[bi];
                const pb = block.children[bi - 1];
                const startLine = b.loc.start.line;
                const endLine = pb.loc.end.line;
                if ((endLine - startLine - 1) <= 0) {
                    continue;
                }
                for (let i = 0; i < (endLine - startLine); i++) {
                    b.raw = "\\n" + b.raw;
                }
            }
            // Replace String
            for (let bi = block.children.length - 1; bi >= 0; bi--) {
                const b = block.children[bi];
                const text = block.raw;
                const strs = [
                    text.slice(0, b.range[0] - block.range[0]), // Start
                    b.raw, // Mid
                    text.slice(b.range[1] - block.range[0]) // End
                ];
                block.raw = strs.join("");
            }
            return block;
        }
        if (block.type === "CodeBlock" || block.type === "Code") {
            return block;
        }

        // Process
        let text = block.raw;
        text = npm.process(text);
        text = github.process(text);

        block.raw = text;
        return block;
    };
    return tranChildren(ast).raw;
};