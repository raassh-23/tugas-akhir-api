const {Pool} = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const {mapLeaderboardDBToModel} = require('../../utils');

class LeaderboardServices {
  constructor() {
    this._pool = process.env.HEROKU ?
      new Pool() :
      new Pool({
        connectionString: process.env.DATABASE_URL,
      });
  }

  async addItem({level, username, steps, commands, timeMs}) {
    const query = {
      text: 'INSERT INTO leaderboard' +
        '(level, username, steps, commands, time_ms) ' +
        'VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [level, username, steps, commands, timeMs],
    };

    const {rows} = await this._pool.query(query);
    const resultId = rows[0].id;

    if (!resultId) {
      throw new InvariantError('Can\'t add item to leaderboard');
    }

    return resultId;
  }

  async getItems() {
    const query = {
      text: 'SELECT * FROM leaderboard',
    };

    const result = await this._pool.query(query);

    return result.rows.map(mapLeaderboardDBToModel);
  }
}

module.exports = LeaderboardServices;
