const initializeClient = require('./utils/createClient');
const hadithapi = require('./services/fetch-hadidth');

const groups = [
  { id: '923207411866-1587564115@g.us', name: 'Brothers 🌹' },
  { id: '923059663768-1537270210@g.us', name: 'CS Boys 2k18 ❤ NFC' },
  { id: '120363084043163851@g.us', name: 'BUSY LOGO KA GROUP 😂' },
  { id: '120363045810970768@g.us', name: 'No Pubg ✋' },
];

const client = initializeClient();

client.on('ready', async () => {
  console.log('Client is ready. Setting up the schedule.');
  // const message = await hadithapi();
  // console.log(message);
  // groups.forEach(({ id, name }) => {
  //   client.sendMessage(id, message);
  // });
});

// Schedule task to run every Monday to Friday at 10 AM
// cron.schedule('0 10 * * 1-5', () => {
//     console.log('Running scheduled task');
//     createClient();
//   });
