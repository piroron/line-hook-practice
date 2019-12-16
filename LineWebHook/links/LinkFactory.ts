import { Message, TemplateMessage } from "@line/bot-sdk";

export class LinkBuilder {

    /**
     * create
     */
    public create(): Message {
        const template: TemplateMessage = {
            type: 'template',
            altText: "お勧めです",
            template: {
                type: 'carousel',
                columns: [
                    {
                        thumbnailImageUrl: 'https://tryworks.jp/wp/wp-content/themes/kapibarasan/images/about/sp/chara02.png',
                        title: 'ホワイトさん',
                        text: 'かわいい',
                        actions: [
                            {
                                type: 'message',
                                label: 'vote',
                                text: 'ホワイトさん'
                            }
                        ]

                    },
                    {
                        thumbnailImageUrl: 'https://tryworks.jp/wp/wp-content/themes/kapibarasan/images/about/sp/chara01.png',
                        title: 'カピバラさん',
                        text: 'かわいい',
                        actions: [
                            {
                                type: 'message',
                                label: 'vote',
                                text: 'カピバラさん'
                            }
                        ]
                    }
                ],
                imageAspectRatio: 'square',
                imageSize: 'contain'
            }
        }
        return template;
    }
}