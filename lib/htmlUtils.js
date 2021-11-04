export function parseTag(html, tag, start = 0) {
    const startIndex = html.indexOf(`<${tag}`, start);
    const endIndex = html.indexOf(`</${tag}>`, startIndex);
    return html.slice(startIndex, endIndex + tag.length + 3);
}

export function innerHtml(html) {
    const start = html.indexOf('>') + 1;
    const end = html.lastIndexOf('<');
    return html.slice(start, end);
}

export function parseProp(html, prop) {
    const start = html.indexOf(prop) + prop.length + 2;
    const end = html.indexOf('\"', start);
    return html.slice(start, end);
}