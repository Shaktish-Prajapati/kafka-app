const { Kafka } = require('kafkajs')

exports.kafka = new Kafka({
    client: 'kafka-app',
    brokers: ['localhost:9092'] // we can provide  multiple broker addresses as an array of strings and pass ip address of machine or urls
})

