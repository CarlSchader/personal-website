export function parsePreamble(latexString) {
    let tags = {};

    for (const line of latexString.split('\n')) {
        if (line.includes('\\begin{document}')) {
            break;
        } else {
            if (line[0] === '\\') {
                const endOfTag = line.indexOf('{');
                if (endOfTag !== -1) {
                    const tag = line.slice(1, endOfTag);
                    tags[tag] = line.slice(endOfTag + 1, line.indexOf('}', endOfTag + 1));
                }
            }
        }
    }

    return tags;
}