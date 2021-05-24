# Scriptable Docs Bot

A Discord bot that sends embeds containing pages from the documentation of [Scriptable](https://scriptable.app), a JavaScript automation app for iOS. The documentation can be read in full [here](https://docs.scriptable.app) and in the app.

This bot is a work in progress. Currently its only function is reading the Scriptable documentation. However, it may gain the ability to store tags and search [unofficial documentation](https://scriptable-for-dummies.vercel.app) as well in the future.

Made by FifiTheBulldog for the [r/Scriptable](https://reddit.com/r/Scriptable) Discord server.

## Setting up
This bot runs on [Node.JS](https://nodejs.org), using [Discord.JS](https://discord.js.org) to communicate with the Discord API.

To install the bot, run the following commands in a terminal:

1. `git clone https://github.com/FifiTheBulldog/scriptable-docs-bot`
2. `cd scriptable-docs-bot`
3. `npm i`

Create a `.env` file in the scriptable-docs-bot directory and add a key-value pair, where the key is `DISCORD_TOKEN` and the value is your bot's token.

For example, if the bot's token is `abc.def`, then `.env` would look like this:

    DISCORD_TOKEN="abc.def"

Edit `preferences.json` to change the path to the folder containing the Scriptable documentation files, which are pulled from the Scriptable for Mac beta. On macOS, the path is `/Applications/Scriptable.app/Contents/Resources/docs`. On other platforms, this will need to be changed. The documentation files are not included with this repository because Scriptable is not under an open-source license, but the app can be downloaded from here: https://scriptable.app/mac-beta

Run `node .` in the terminal to start the bot.