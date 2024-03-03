if (process.env.NODE_ENV !== 'production') {
    require('dotenv/config');
};

import amqp from '../infra/amqp';
import { ttsQueue } from './constants';
import envValidator from './validator/env.validator';

console.log('Como demo, o acesso real a gpu foi desabilitado.');
init();

async function init() {
    await envValidator.validateAsync({
        AMQP_URL: process.env.AMQP_URL,
        IA_URL: process.env.IA_URL,
        IA_PASS: process.env.IA_PASS,
    });

    await amqp.initialize();
    await amqp.getChannel().assertQueue(ttsQueue, { durable: true });

    amqp.getChannel().consume(ttsQueue, async (msg: any) => {
        amqp.getChannel().ack(msg);
        const data: any = JSON.parse(msg.content.toString()).input;
        console.log(` [x] Received ${data} ` );
    
        //simulate heavy work
        await new Promise((resolve, reject) => setTimeout(() => resolve(true), 2000)); // 2 seconds 
    
        var headers = data.headers || {};
        headers['Content-Type'] = 'application/json';
    
        var body = {
            data: data.metadata || null,
            audio: 'audio'
        }
    
        fetch(data.webhook, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
            mode: 'no-cors'
        })
          .then(() => console.log(`Webhook sent`))
          .catch((e) => console.log(`Error on sending webhook call, ${e}`));
    });
    
};