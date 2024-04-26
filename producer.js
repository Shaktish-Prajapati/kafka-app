const { kafka } = require('./client');
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function init() {
    const producer = kafka.producer();
    console.log('creating producer...')
    await producer.connect();
    console.log('producer connected...');

    rl.setPrompt('> ')
    rl.prompt();
    rl.on('line', async (line) => {
        const [riderName, locationName] = line.split(' ')
        await producer.send({
            topic: 'rider-update',
            messages: [
                {
                    partition: locationName.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-update', value: JSON.stringify({
                        name: riderName, location: locationName
                    })
                }
            ]
        })

    }).on('close', async () => {
        console.log('producer disconnecting...')
        await producer.disconnect();
    })

}

init();