
export class Questions {
    items: Array<Question>;

    constructor() {
        const q1: Question = {            
            text: '人数は？',
            shortText: '人数',
            data: 'a',
            answers: [
                {
                    text: '20名未満',
                    data: '1'
                },
                {
                    text: '20名以上50名未満',
                    data: '2'
                }
            ]
        }
        const q2: Question = {            
            text: 'ゲストの一人当たりご予算は？',
            shortText: 'ご予算',
            data: 'b',
            answers: [
                {
                    text: '10,000円未満',
                    data: '1'
                },
                {
                    text: '10,000円以上20,000円未満',
                    data: '2'
                },
                {
                    text: '20,000円以上',
                    data: '3'
                }
            ]
        }
        const q3: Question = {            
            text: '開催時期は？',
            shortText: '時期',
            data: 'c',
            answers: [
                {
                    text: '3ヶ月以内',
                    data: '1'
                },
                {
                    text: '6か月以内',
                    data: '2'
                },
                {
                    text: '9か月以内',
                    data: '3'
                },
                {
                    text: '9か月より後',
                    data: '4'
                }
            ]
        }
        this.items = [q1, q2, q3]
    }
}

/**
 * 質問内容
 */
export interface Question {
    text: string;
    shortText: string;
    data: string;
    answers: Array<Answer>;
}

export interface Answer {
    text: string;
    data: string;
}