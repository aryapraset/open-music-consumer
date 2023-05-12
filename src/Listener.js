/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
class Listener {
  constructor(playlistSongService, mailSender) {
    this._playlistSongService = playlistSongService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {userId, targetEmail} = JSON.parse(message.content.toString());

      const playlistSong = await this._playlistSongService.getSongsByPlaylistId(userId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistSong));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = Listener;
