/* eslint-disable require-jsdoc */
const {Pool} = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
  async getSongsByPlaylistId(playlistId) {
    const queryPlaylist = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const querySong = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlistsongs
      LEFT JOIN songs ON songs.id = playlistsongs.song_id
      WHERE playlistsongs.playlist_id = $1`,
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(queryPlaylist);
    const songResult = await this._pool.query(querySong);
    console.log(playlistResult);
    console.log(songResult);
    return {
      playlist: {
        ...playlistResult.rows[0],
        songs: songResult.rows,
      },
    };
  }
}
module.exports = PlaylistsService;
