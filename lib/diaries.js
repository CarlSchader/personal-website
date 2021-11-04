export function parseComments(markdownString) {
    let metaData = {};

    const comments = markdownString.match(/\[\/\/\]: # \(.+?:.+?\)\n/g);

    comments.map(comment => {
        const key = comment.slice(9, comment.indexOf(':', 9));
        const value = comment.slice(comment.indexOf(':', 9) + 1, comment.indexOf(')', 9));
        metaData[key] = value;
    });

    return metaData;
}

export async function getRegistry(url) {
    const res = await fetch(url);
    const registry = await res.json();
    return registry;
}


export function toUrlValid(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}
