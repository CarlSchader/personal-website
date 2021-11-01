import process from 'process';

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

export async function getRegistry(title, url = process.env.REGISTRY_URL) {
    const res = await fetch(url);
    const registry = await res.json();
    return registry;
}


export function toUrlValid(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

// export function getDiaries() {
//     const fileNames = fs.readdirSync(path.join(process.cwd(), 'diaries'));

//     const diaries = fileNames.map(file => {
//         const data = fs.readFileSync(path.join(process.cwd(), 'diaries', file), { encoding: 'utf8' });
//         const urlName = file.slice(0, file.lastIndexOf('.'));
//         const metaData = parseComments(data);
//         return {
//             data,
//             urlName,
//             ...metaData,
//         };
//     });

//     diaries.sort((diary1, diary2) => {
//         return new Date(diary1.date) - new Date(diary2.date);
//     });

//     return diaries;
// }
