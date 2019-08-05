
export class Questions {
    items: Array<Question>;

    constructor() {
        const q1: Question = {            
            text: '人数は？',
            data: 'a',
            answers: [
                {
                    text: '20名未満',
                    data: 1
                },
                {
                    text: '20名以上50名未満',
                    data: 2
                }
            ]
        }
        const q2: Question = {            
            text: 'ゲストの一人当たり予算は？',
            data: 'b',
            answers: [
                {
                    text: '10,000円未満',
                    data: 1
                },
                {
                    text: '10,000円以上20,000円未満',
                    data: 2
                },
                {
                    text: '20,000円以上',
                    data: 3
                }
            ]
        }
        this.items = [q1, q2]
    }
}

/**
 * 質問内容
 */
export interface Question {
    text: string;
    data: string;
    answers: Array<Answer>;
}

export interface Answer {
    text: string;
    data: number;
}