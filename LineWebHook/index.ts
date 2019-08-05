// process.env.API_BASE_URL = "http://localhost:8080/";

import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {
    // main APIs
    Client,
    middleware,
  
    // exceptions
    JSONParseError,
    SignatureValidationFailed,
  
    // types
    TemplateMessage,
    WebhookRequestBody,
    WebhookEvent,
    MessageEvent,
    validateSignature,
  } from "@line/bot-sdk";
import * as question from './enquete';
import { PostbackExchanger } from "./services/Postback";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const config = {
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
        channelSecret: process.env.CHANNEL_SECRET,
    }

    if(!validateSignature(req.rawBody, config.channelSecret, req.headers["x-line-signature"])) {
        context.res = {
            status: 400,
            body: "invalid token."
        };
        return
    }

    const client = new Client(config) // will throw a compile error

    const hook: WebhookRequestBody = req.body;
    console.log(hook.destination)

    for (const ev of hook.events) {
        if('message' in ev) {

            if('text' in ev.message) {
                if(ev.message.text === 'start') {
                    // start enquete
                    context.log('question: start');
                    const pb = new PostbackExchanger(new question.Questions());
                    const reply = pb.start();
                    client.replyMessage(ev.replyToken, reply);

                }
            }

            // const message = ev.message;

            // if('text' in message) {

            //     if(message.text === "20人超") {
            //         client.replyMessage(ev.replyToken,
            //             {
            //                 type: "text",
            //                 text: "select 20 over."
            //             }
            //         )
            //     } else {

            //         client.replyMessage(ev.replyToken,
            //             {
            //                 type: "text",
            //                 text: "select your favorite",
            //                 quickReply: {
            //                     items: [
            //                         {
            //                             type: "action",
            //                             action: {
            //                                 type: "message",
            //                                 label: "over 20",
            //                                 text: "20人超"
            //                             }
            //                         },
            //                         {
            //                             type: "action",
            //                             action: {
            //                                 type: "message",
            //                                 label: "over 50",
            //                                 text: "50人超"
            //                             }
            //                         }
            //                     ]
            //                 }
            //             }
            //         )
            //     }
            // } 
        } else if ('postback' in ev) {
            context.log('question: next');
            context.log(`postback data: ${ev.postback.data}`);
            const pb = new PostbackExchanger(new question.Questions());
            const reply = pb.next(ev);
            client.replyMessage(ev.replyToken, reply);
        }
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 200,
        body: "Hello " + "res"
    };

    context.log('success for call.')
};

export default httpTrigger;
