/* eslint-disable require-jsdoc */
const {Pool} = require('pg');

class PlaylistSongService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsByPlaylistId(userId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
      JOIN playlistsongs ON songs.id = playlistsongs.song_id
      JOIN playlists ON playlistsongs.playlist_id = playlists.id
      WHERE playlist_id = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongService;
