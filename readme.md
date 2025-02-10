# SimpleBot 🤖

A simple Discord bot that monitors messages with the `#newgamer` tag and downloads attached images.

## Table of Contents
- [Features ✨](#features-)
- [Requirements ✅](#requirements-)
- [Installation 🔧](#installation-)
- [Configuration ⚙️](#configuration-)
- [Execution 🚀](#execution-)
- [License 📄](#license-)

## Features ✨

- **Message Logging:** Detects messages with `#newgamer` and logs them.  
- **File Management:** Saves messages in `mensajes.txt` and images in the `images` folder.  
- **Activity Logging:** Records activities and errors in `log.txt`.

## Requirements ✅

- **Node.js and npm:** Installed on your machine.
- **Discord Account & Bot:** Create and configure your bot on the [Discord Developer Portal](https://discord.com/developers/applications).

## Installation 🔧

1. **Clone the Repository:**

    ```bash
    git clone <REPOSITORY_URL>
    ```

2. **Install Dependences**:

    ```bash
    npm install discord.js dotenv axios
    npm install --save-dev @types/axios
## Configuration ⚙️

Create a [.env](http://_vscodecontentref_/0) file at the root of the project with the following content:

```env
DISCORD_TOKEN=your_discord_token_here
```
## Run bot ✔ 

```bash 
npx ts-node src/bot.ts
```
