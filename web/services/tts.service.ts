import { Channel } from 'amqplib';
import amqp from '../../infra/amqp';
import tts from '../validators/tts.validator';
import { ttsQueue } from '../constants';

interface input { 
    voice: string,
    webhoook: string, 
    text: string, 
    headers: {
        [key: string]: any;
    },
    metadata: any
}

function handleCreateTts(input: input): void {
    const channnel: Channel = amqp.getChannel();
    channnel.sendToQueue(ttsQueue, Buffer.from(JSON.stringify({input})));
    return;
}

export default handleCreateTts;