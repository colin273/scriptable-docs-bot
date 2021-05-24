module.exports = (string) => {
    const replacedSingleLine = string.replaceAll(/\<code\>([^\<\>\n]+)\<\/code\>/g, "`" + "$1" + "`")
    return replacedSingleLine.replaceAll(/\n\<code\>/g, "```js\n").replaceAll(/\<\/code\>\n/g, "```")
}