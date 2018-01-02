import { process } from './../lib/npm';

describe('Npm Process', () => {

    const linkRegexp = (pkgName: string) => {
        const matchTextStart =
            `\\[${pkgName}\\]\\(https://www.npmjs.com/package/${pkgName}`;
        const matchTextEnd = "\\)";
        return new RegExp(
            `${matchTextStart}(\\s+.*)?${matchTextEnd}`
        );
    };

    it("Top Downloads", () => {
        // Data from http://npmjs.ir
        const tops = [
            "async", "debug", "supports-color", "lodash", "source-map", "ms",
            "chalk", "minimist", "qs", "inherits", "semver", "isarray",
            "commander", "kind-of", "ansi-regex", "boom", "strip-ansi",
            "request", "object-assign", "punycode", "mkdirp", "graceful-fs",
            "balanced-match", "uuid", "is-number", "mime", "har-validator",
            "is-fullwidth-code-point", "form-data", "string-width", "uglify-js",
            "rimraf", "strip-bom", "iconv-lite", "js-yaml", "tunnel-agent",
            "resolve", "cryptiles", "mime-types", "aws-sign2", "http-signature",
            "mime-db", "setprototypeof", "has-flag", "once", "safe-buffer",
            "has-ansi", "tough-cookie", "xtend", "path-exists", "debug", "glob",
            "async", "readable-stream", "qs", "source-map", "supports-color",
            "minimist", "yargs", "lodash", "ms", "chalk", "camelcase",
            "isarray", "inherits", "minimatch", "string_decoder", "strip-ansi",
            "ansi-styles", "wordwrap", "semver", "ansi-regex", "commander",
            "kind-of", "boom", "assert-plus", "object-assign", "punycode",
            "request", "esprima", "acorn", "mkdirp", "uuid", "form-data",
            "graceful-fs", "is-number", "mime", "ajv",
            "is-fullwidth-code-point", "string-width", "lru-cache",
            "har-validator", "mime-types", "iconv-lite", "mime-db", "js-yaml",
            "cryptiles", "cliui", "balanced-match", "tunnel-agent", "debug",
            "async", "readable-stream", "glob", "qs", "supports-color",
            "lodash", "minimist", "source-map", "ms", "chalk", "yargs",
            "isarray", "camelcase", "inherits", "semver", "minimatch",
            "strip-ansi", "string_decoder", "commander", "kind-of", "acorn",
            "object-assign", "ansi-regex", "wordwrap", "ansi-styles",
            "assert-plus", "request", "esprima", "mkdirp", "punycode",
            "graceful-fs", "form-data", "uuid", "balanced-match", "mime",
            "string-width", "mime-types", "is-number", "har-validator",
            "is-fullwidth-code-point", "ajv", "mime-db", "iconv-lite", "rimraf",
            "boom", "lru-cache", "uglify-js", "cryptiles", "aws-sign2"
        ];
        const testDatas = [...tops].map((item) => `npm:${item}`);
        for (let i = 0; i < tops.length; i++) {
            const item = testDatas[i];
            const content = process(item);
            const reg = new RegExp(`^${linkRegexp(tops[i]).source}$`);

            content.should.be.not.equal(item);
            content.should.be.match(reg);
        }
    });

    it("left space", () => {
        const str = "  npm:hexo-cli";
        const content = process(str);
        const reg = new RegExp(`^  ${linkRegexp("hexo-cli").source}$`);

        content.should.be.match(reg);
    });

    it("right space", () => {
        const str = "npm:fullpage.js  ";
        const content = process(str);
        const reg = new RegExp(`^${linkRegexp("fullpage.js").source}  $`);

        content.should.be.match(reg);
    });

    it("both spaces", () => {
        const str = "  npm:@nest/testing   ";
        const content = process(str);

        content.should.be.equal(`  ${process("npm:@nest/testing")}   `);
    });

});