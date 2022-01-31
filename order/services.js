let nodemailer = require("nodemailer");
const {v4 : uuidv4} = require('uuid');
const amqp = require("amqplib");
const path = require("path");
//Get token from model, create cookies and send response

exports.amqpconnect =async () =>{
    //const amqpServer = "amqp://localhost:5672";
    const amqpServer = "amqps://grvuever:rOs1QJQWVSt_azqZWZuzmDQyoHFGyjNO@baboon.rmq.cloudamqp.com/grvuever"
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");

}