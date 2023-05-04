const InvalidError = require('../../exceptions/InvalidError');
const {translateModelColumnNameToDB} = require('../../utils');

class LeaderboardHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postLeaderboardHandler = this.postLeaderboardHandler.bind(this);
    this.getLeaderboardHandler = this.getLeaderboardHandler.bind(this);
  }

  async postLeaderboardHandler({payload}, h) {
    const newItem = this._validator.validatePayload(payload);

    const itemId = await this._service.addItem(newItem);

    return h.response({
      error: false,
      message: 'Item added to leaderboard',
      data: {
        id: itemId,
      },
    }).code(201);
  }

  async getLeaderboardHandler({query}) {
    const {
      level,
      sortBy,
      order,
      page,
      pageSize,
    } = this._validator.validateQuery(query);

    const totalCount = await this._service.getCountByLevel(level);
    const maxPage = Math.ceil(totalCount/pageSize) || 1;

    if (page > maxPage) {
      throw new InvalidError('Page exceeds max page');
    }

    const translatedSortBy = translateModelColumnNameToDB(sortBy);

    const items = await this._service
        .getItemsByLevel(level, translatedSortBy, order, page, pageSize);

    return {
      error: false,
      message: 'Leaderboard retrieved',
      data: {
        page,
        maxPage,
        count: items.length,
        items,
      },
    };
  }
}

module.exports = LeaderboardHandler;
