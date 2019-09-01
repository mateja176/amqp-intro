import * as amqp from 'amqplib';

amqp.connect('amqp://localhost').then(connection =>
  connection.createChannel().then(channel => {
    const queueName = 'hello';
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      ({ content }) => {
        console.log(` [x] Received ${content}`);
      },
      {
        noAck: true,
      },
    );
  }),
);
