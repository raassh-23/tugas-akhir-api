class LeaderboardHandler {
  constructor(service) {
    this._service = service;

    this.postLeaderboardHandler = this.postLeaderboardHandler.bind(this);
    this.getLeaderboardHandler = this.getLeaderboardHandler.bind(this);
  }

  async postLeaderboardHandler(request, h) {
    const {level, username, steps, commands, time_ms: timeMs} = request.payload;

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

  async getLeaderboardHandler() {
    const items = await this._service.getItems();

    return {
      error: false,
      message: 'Leaderboard',
      data: {
        count: items.length,
        items,
      },
    };
  }
}

module.exports = LeaderboardHandler;
