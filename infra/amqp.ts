import Amqp from 'amqplib';

var connection: Amqp.Connection;
var channel: Amqp.Channel;

async function initialize(): Promise<void> {
    connection = await Amqp.connect(process.env.AMQP_URL as string);
    channel = await connection.createChannel();

    return;
}

function getChannel(): typeof channel {
    return channel;
}

export default Object.freeze({ initialize, getChannel });
