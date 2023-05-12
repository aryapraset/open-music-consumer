require('dotenv').config();

const amqp = require('amqplib');
const PlaylistSongService = require('./PlaylistSongService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const playlistSongService = new PlaylistSongService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistSongService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistSong', {
    durable: true,
  });

  channel.consume('export:playlistSong', listener.listen, {noAck: true});
};

init();
