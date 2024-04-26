const { kafka } = require('./client')

async function init() {
    const admin = kafka.admin();
    console.log('admin conecting...')
    admin.connect()
    console.log('admin connection successful...')

    console.log('creating topic [rider-updated]');
    await admin.createTopics({
        topics: [{
            topic: 'rider-update',
            numPartitions: 2,
        }]
    })
    console.log('Topic [rider-update]  created')
    console.log('admin disconnecting')
    await admin.disconnect();
}

init();