module.exports = (string) => {
    return string.replaceAll(/\<code\>([^\<\>\n]+)\<\/code\>/g, "`" + "$1" + "`")
        .replaceAll(/\n\<code\>/g, "```js\n")
        .replaceAll(/\<\/code\>\n/g, "```")
        .replaceAll(/\<\/?strong\>/g, "**")
}