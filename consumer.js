const { kafka } = require('./client');
const group = process.argv[2] || 'test-group';

async function init() {
    const consumer = kafka.consumer({ groupId: group });

    console.log('connecting consumer...');
    await consumer.connect()
    await consumer.subscribe({ topics: ['rider-update'], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`${group} [${topic}]: Partition: ${partition} | Message: `, message.value.toString())
        }
    })
    // await consumer.disconnect();

}

init();