export const toSeconds = (str) => {
    const pieces = str.split(":");
    const result = Number(pieces[0]) * 60 + Number(pieces[1]);
    return parseInt(result.toFixed(0));
}
