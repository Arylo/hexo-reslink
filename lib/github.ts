export const REG = /github:([a-z\d_-]+(\/[a-z\d._-]+)?)/;

export const process = (text: string) => {
    if (!REG.test(text)) {
        return text;
    }
    text = text.replace(new RegExp(REG, "g"), (words) => {
        const {
            1: resName
        } = (words.match(REG) as RegExpMatchArray);
        const url = `https://github.com/${resName}`;
        const title = `"Github Resource: ${resName}"`;
        return `[${resName}](${url} ${title})`;
    });
    return text;
};
