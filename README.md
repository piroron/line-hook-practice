# line-hook-practice
This repository is practice using LINE Messaging API.(https://developers.line.biz/ja/docs/messaging-api/overview/)

## Environment
### WebHook Server
Azure Functions(in Microsoft Azure)

### Program Language
TypeScript in Node.js

### Develop environment
Visual Studio Code

Reference: https://github.com/Microsoft/vscode-azurefunctions

### Debug tools

* LINESimulator

https://github.com/kenakamu/LINESimulator

## Usage
### Line
Set your `CHANNEL_SECRET` and `CHANNEL_ACCESS_TOKEN` to `local.setting.json` and your azure function app's application settings, too.

show `local.setting-sample.jsonc`.