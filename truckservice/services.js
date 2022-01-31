const amqp = require("amqplib");
exports.amqpconnect =async () =>{
    //const amqpServer = "amqp://localhost:5672";
    const amqpServer = "amqps://grvuever:rOs1QJQWVSt_azqZWZuzmDQyoHFGyjNO@baboon.rmq.cloudamqp.com/grvuever"
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("TRUCK");

}