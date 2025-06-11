"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const ses = new aws_sdk_1.SES({ region: 'ap-northeast-1' });
const handler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const { name, email, phone, message } = body;
        const emailParams = {
            Source: 'zhufaqiang@inexus.co.jp',
            Destination: {
                ToAddresses: ['zhufaqiang@inexus.co.jp'],
            },
            Message: {
                Subject: {
                    Data: `お問い合わせフォーム（${name}様より）`,
                },
                Body: {
                    Text: {
                        Data: `
                新しいお問い合わせが届きました：

                お名前: ${name}
                メール: ${email || '未入力'}
                電話番号: ${phone || '未入力'}

                メッセージ:
                ${message}
            `,
                    },
                },
            },
        };
        await ses.sendEmail(emailParams).promise();
        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ message: 'Email sent successfully.' }),
        };
    }
    catch (error) {
        console.error('Send error:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to send email.' }),
        };
    }
};
exports.handler = handler;
