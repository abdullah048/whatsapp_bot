// createClient.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const initializeClient = () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        // Add any Puppeteer args here
      ],
    },
  });

  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('authenticated', session => {
    console.log('Authenticated successfully.');
  });

  client.on('ready', () => {
    console.log('WhatsApp client is ready!');
  });

  client.on('message', message => {
    console.log(`Received message from ${message.from}: ${message.body}`);
  });

  client.on('auth_failure', msg => {
    console.error('Authentication failure:', msg);
  });

  client.on('disconnected', reason => {
    console.log('Client was logged out:', reason);
    client.initialize();
  });

  client.initialize();

  return client;
};

module.exports = initializeClient;
