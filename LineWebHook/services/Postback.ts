import { PostbackAction, PostbackEvent, QuickReplyItem, TextMessage, Message } from '@line/bot-sdk';
import { Questions, Question } from '../enquete';


export declare type Count = 'one' | 'two';
export class PostbackExchanger {
    private separator = ':';
    constructor(
        private question: Questions
    ) {

    }

    start(): Message {
        return this.toText(this.question.items[0]);
    }

    next = (event: PostbackEvent): Message => {
        const data = event.postback.data;
        const answers = data.split(this.separator);
        const last = answers[answers.length - 1];

        const div = last.split('=');
        if (div.length !== 2) { 
            return this.start();
        }
        
        for (let index = 0; index < this.question.items.length; index++) {
            const element = this.question.items[index];
            if (element.data === div[0]) {

                if(index === this.question.items.length - 1) {
                    return this.end(event);
                } else {
                    return this.toText(this.question.items[index + 1], data);
                }
            }
        }

        return this.start();
    }

    private toText = (question: Question, preAnswer: string = ''): Message => {
        const prefix = preAnswer.length === 0 ? '' : `${preAnswer}${this.separator}`;
        const quicks: QuickReplyItem[] = question.answers.map(v => {
            const res: QuickReplyItem =
            {
                type: "action",
                action: {
                    type: "postback",
                    displayText:'',
                    label: v.text,
                    data: `${prefix}${question.data}=${v.data}`,
                    text: v.text                
                }
            };
            return res;
        })
        const rep: TextMessage = {
            type: 'text',
            text: question.text,
            quickReply: {
                items: quicks
            }
        }

        return rep;
    }

    private end(event: PostbackEvent): Message {
        const data = event.postback.data;
        const answers = data.split(this.separator);
        const results = answers.map(answer => {
            const qa = answer.split('=');
            const org = this.question.items.find(q => q.data === qa[0]);
            const ans = org.answers.find(a => a.data === qa[1]);
            return `${org.shortText}: ${ans.text}`;
        }
        )
        const result = results.join('\n');
        const rep: TextMessage = {
            type: 'text',
            text: 'ご回答ありがとうございました！\n' + result
        };
        return rep;
    }
    
}