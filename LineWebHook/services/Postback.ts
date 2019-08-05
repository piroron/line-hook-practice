import { PostbackAction, PostbackEvent, QuickReply, QuickReplyItem, TextMessage } from '@line/bot-sdk';
import { Questions, Question } from '../enquete';

export class PostbackExchanger {
    readonly separator: ':';
    constructor(
        private question: Questions
    ) {

    }

    start(): TextMessage {
        return this.toText(this.question.items[0]);
    }

    next(event: PostbackEvent): TextMessage {
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
                break;
            }
        }

        return this.start();
    }

    private toText(question: Question, preAnswer: string = ''): TextMessage {
        const prefix = preAnswer.length === 0 ? '' : `${preAnswer}:`;
        const quicks: QuickReplyItem[] = question.answers.map(v => {
            const res: QuickReplyItem =
            {
                type: "action",
                action: {
                    type: "postback",
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

    private end(event: PostbackEvent): TextMessage {
        const rep: TextMessage = {
            type: 'text',
            text: 'ご回答ありがとうございました！'
        };
        return rep;
    }
    
}