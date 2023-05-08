const {Pool} = require('pg');
const InvalidError = require('../../exceptions/InvalidError');
const {mapLeaderboardDBToModel} = require('../../utils');

class LeaderboardServices {
  constructor() {
    this._pool = !process.env.HEROKU ?
      new Pool() :
      new Pool({
        connectionString: process.env.DATABASE_URL,
      });
  }

  async addItem({level, username, actions, codeBlocks, timeMs}) {
    const query = {
      text: `INSERT INTO \
            leaderboard(level, username, actions, code_blocks, time_ms) \
            VALUES($1, $2, $3, $4, $5) RETURNING id`,
      values: [level, username, actions, codeBlocks, timeMs],
    };

    const {rows} = await this._pool.query(query);
    const resultId = rows[0].id;

    if (!resultId) {
      throw new InvalidError('Can\'t add item to leaderboard');
    }

    return resultId;
  }

  async getItemsByLevel(level, sortBy, order, page, pageSize) {
    if (sortBy === 'timeMs') {
      sortBy = 'time_ms';
    } else if (sortBy === 'codeBlocks') {
      sortBy = 'code_blocks';
    }

    const query = {
      text: `SELECT * FROM leaderboard WHERE level = $1 \
            ORDER BY ${sortBy} ${order}, created_at ASC \
            LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`,
      values: [level],
    };

    const {rows} = await this._pool.query(query);

    return rows.map(mapLeaderboardDBToModel);
  }

  async getCountByLevel(level) {
    const query = {
      text: `SELECT count(id) FROM leaderboard WHERE level = $1`,
      values: [level],
    };

    const {rows} = await this._pool.query(query);

    return rows[0].count;
  }
}

module.exports = LeaderboardServices;
