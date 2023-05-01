class LeaderboardHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postLeaderboardHandler = this.postLeaderboardHandler.bind(this);
    this.getLeaderboardHandler = this.getLeaderboardHandler.bind(this);
  }

  async postLeaderboardHandler({payload}, h) {
    this._validator.validatePayload(payload);

    const {level, username, steps, commands, time_ms: timeMs} = payload;

    const itemId = await this._service.addItem({
      level, username, steps, commands, timeMs,
    });

    return h.response({
      error: false,
      message: 'Item added to leaderboard',
      data: {
        id: itemId,
      },
    }).code(201);
  }

  async getLeaderboardHandler({query}) {
    this._validator.validateQuery(query);

    const {
      level,
      sortBy,
      order,
    } = query;

    const items = await this._service.getItemsByLevel(level);

    items.sort((a, b) =>
      order === 'desc' ?
        b[sortBy] - a[sortBy] :
        a[sortBy] - b[sortBy],
    );

    return {
      error: false,
      message: 'Leaderboard retrieved',
      data: {
        count: items.length,
        items,
      },
    };
  }
}

module.exports = LeaderboardHandler;
