const { readFileSync } = require('fs')

require('dotenv').config()
const discord = require('discord.js')
require('discord-reply')

const docsEmbedMaker = require('./docs.js')

const { DISCORD_TOKEN } = process.env

const { prefix, docsPath} = require('./preferences.json')

const docsPages = require("require-all")({
    dirname: docsPath,
    map: (name, path) => {
        return "page" + name
    }
})

const client = new discord.Client()

client.login(DISCORD_TOKEN)

client.on("ready", () => console.log("Ready"))

client.on("message", message => {
    if (message.author.bot) return
    
    content = message.content.trim().toLowerCase()
    if (content.startsWith(prefix)) {
        const cmd = content.match(new RegExp("\\" + prefix + "([a-z\d]+)"))[1]
        switch(cmd) {
            case "docs":
                const docsEmbed = new discord.MessageEmbed()
                const arguments = content.split(/\s+/)
                try {
                    message.lineReplyNoMention(docsEmbedMaker(arguments, docsEmbed, docsPages)).catch(error => {
                        const errorEmbed = new discord.MessageEmbed()
                        errorEmbed.setColor("RED")
                        errorEmbed.setTitle("Error")
                        errorEmbed.setDescription(error)
                        message.lineReplyNoMention(errorEmbed)
                    })
                } catch(error) {
                    console.error(error)
                }
                break
            case "docshelp":
                const helpEmbed = new discord.MessageEmbed()
                helpEmbed.setColor("GREEN")
                helpEmbed.setTitle("Help")
                helpEmbed.setDescription("Commands for this bot")
                helpEmbed.addField(prefix + "docs", readFileSync("./docs-command.md").toString().replace(/\{\{prefix\}\}/g, prefix))
                helpEmbed.addField(prefix + "docshelp", "Display this help message.")
                message.lineReplyNoMention(helpEmbed)
                break
            case "shutdown":
                if (message.author.id === "690213339862794285") {
                    client.destroy()
                    process.exit()
                }
                break
            default:
                return
        }
    }
})