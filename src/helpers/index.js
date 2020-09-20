export const toSeconds = (str) => {
    const pieces = str.split(":");
    const result = Number(pieces[0]) * 60 + Number(pieces[1]);
    return parseInt(result.toFixed(0));
}

export const getSIDTitle = () => {
    return window.SIDplayer.gettitle().replace(/\0/g, '');
}

export const getSIDAuthor = () => {
    return window.SIDplayer.getauthor().replace(/\0/g, '');
}

export const getSIDInfo = () => {
    return window.SIDplayer.getinfo().replace(/\0/g, '');
}