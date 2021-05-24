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
    content = message.content.trim().toLowerCase()
    if (content.startsWith(prefix)) {
        const cmd = content.match(new RegExp("\\" + prefix + "([a-z\d]+)"))[1]
        switch(cmd) {
            case "docs":
                const embed = new discord.MessageEmbed()
                const arguments = content.split(/\s+/)
                try {
                    message.lineReplyNoMention(docsEmbedMaker(arguments, embed, docsPages)).catch(error => {
                        const errorEmbed = new discord.MessageEmbed()
                        errorEmbed.setColor("RED")
                        errorEmbed.setTitle("Error")
                        errorEmbed.setDescription(error)
                        message.lineReplyNoMention(errorEmbed)
                    })
                } catch(error) {}
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