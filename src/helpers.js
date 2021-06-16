export async function getData(url) {
    return await fetch(url).then(res => res.json())
      .then(res=> res)
      .catch(err => ({err}));
}

export function highlightedSection(name, string){
    const match = name.toLowerCase().match(string.toLowerCase());
    if (match) {
        return { start: match.index, end: match.index + string.length };
    }
    return null;
}