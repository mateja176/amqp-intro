import * as amqp from 'amqplib';

amqp.connect('amqp://localhost').then(connection =>
  connection.createChannel().then(channel => {
    const queueName = 'hello';
    const msg = 'Hello World!';

    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(msg));

    console.log(` [x] Send ${msg}`);
    setTimeout(() => {
      connection.close();
    }, 500);
  }),
);
