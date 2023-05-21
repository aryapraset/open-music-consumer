/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlistSong = await this._playlistsService.getSongsByPlaylistId(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistSong));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = Listener;
