const toBackticks = require('./code-to-backticks.js')

module.exports = (arguments, embed, docsPages) => {
    const docsThings = arguments[1].split(".")
    let docsFilter
    if (docsThings.length === 1) {
        docsFilter = docsItem => docsItem.isRootEntry && docsItem.title.toLowerCase() === docsThings[0].toLowerCase()
    } else {
        if (docsThings[1].match(/^[a-z\d]+/)[0].toLowerCase() === "constructor") docsThings[1] = "new " + docsThings[0] + "()"
        docsFilter = docsItem => docsItem.subtitle && docsItem.subtitle.toLowerCase() === docsThings[0].toLowerCase() && docsItem.title.match(/^[a-z\d]+/i)[0].toLowerCase() === docsThings[1].match(/^[a-z\d]+/i)[0].toLowerCase()
    }
    const indexItem = docsPages.pageindex.filter(docsFilter)[0]
    if (indexItem) {
        const actualDocsPage = docsPages["page" + indexItem.pageId]
        let actualDocsItem
        if (indexItem.isRootEntry) {
            actualDocsItem = actualDocsPage.details.filter(pageItem => (pageItem.id === indexItem.pageEntryId))[0]
            embed.setAuthor("")
            
        } else {
            const parentItem = actualDocsPage.details.filter(pageItem => (pageItem.shortName.toLowerCase() === docsThings[0].toLowerCase()))[0]
            let potentialItems = []
            for (section of parentItem.detailsSections) {
                for (detail of section.details) {
                    potentialItems.push(detail)
                }
            }
            actualDocsItem = potentialItems.filter(pageItem => pageItem.id === indexItem.pageEntryId)[0]
            embed.setAuthor(" of " + parentItem.shortName)
            embed.author.url = parentItem.url
        }

        if (!(arguments[2] && arguments[2].toLowerCase() === "short")) {
            if (actualDocsItem.description) embed.addField("Description", toBackticks(actualDocsItem.description))

            if (actualDocsItem.detailsSections) {
                for (section of actualDocsItem.detailsSections) {
                    let fieldContents = []
                    if (arguments[2] && arguments[2].toLowerCase() === "long") {
                        for (subItem of section.details) {
                            fieldContents.push("**" + subItem.longName + "**\n" + (subItem.summary ? subItem.summary : ""))
                        }
                    } else {
                        fieldContents.push(section.details.length)
                    }
                    embed.addField(section.title, toBackticks(fieldContents.join("\n")))
                }
            }

            if (actualDocsItem.characteristics && actualDocsItem.characteristics.includes("readOnly")) embed.addField("Read-only", "Yes")

            if (actualDocsItem.decleration) embed.addField("Declaration", "```ts\n" + actualDocsItem.decleration + "```")

            if (actualDocsItem.infoSections) {
                for (section of actualDocsItem.infoSections) {
                    let infos = []
                    for (info of section.infos) {
                        infos.push((info.title ? info.title + "\n" : "") + "*" + info.subtitle + "*\n" + info.description)
                    }
                    embed.addField(section.title, toBackticks(infos.join("\n\n")))
                }
            }

            if (actualDocsItem.deprecation) embed.addField("Deprecation", toBackticks(`⚠️ Deprecated in version ${actualDocsItem.deprecation.version}. ${actualDocsItem.deprecation.message}`))
        }

        embed.url = actualDocsItem.url
        embed.title = actualDocsItem.longName
        embed.author.name = actualDocsItem.headline + embed.author.name
        embed.description = (actualDocsItem.subtitle) ? "*" + actualDocsItem.subtitle + "*\n" : ""
        embed.description += actualDocsItem.summary
        embed.description = toBackticks(embed.description)

        embed.color = 1253432
    } else {
        embed.title = "\"" + docsThings.join(".") + "\" not found"
        embed.setColor("RED")
    }

    return embed
}