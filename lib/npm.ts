export const REG = /npm:((?:@?[a-z\d_-]+\/)?[a-z\d._-]+)/;

export const process = (text: string) => {
    if (!REG.test(text)) {
        return text;
    }
    text = text.replace(new RegExp(REG, "g"), (words) => {
        const {
            1: packageName
        } = (words.match(REG) as RegExpMatchArray);
        const url = `https://www.npmjs.com/package/${packageName}`;
        const title = `"Node Library: ${packageName}"`;
        return `[${packageName}](${url} ${title})`;
    });
    return text;
};
