const InvalidError = require('../exceptions/InvalidError');

/* eslint-disable camelcase */
const mapLeaderboardDBToModel = ({
  id,
  level,
  username,
  steps,
  code_blocks,
  time_ms,
  created_at,
}) => ({
  id,
  level,
  username,
  steps,
  codeBlocks: code_blocks,
  timeMs: time_ms,
  createdAt: created_at,
});

const translateModelColumnNameToDB = (columnName) => {
  if (columnName === 'codeBlocks') {
    return 'code_blocks';
  } else if (columnName === 'timeMs') {
    return 'time_ms';
  } else if (
    ['id', 'level', 'username', 'steps', 'created_at']
        .indexOf(columnName) === -1
  ) {
    throw new InvalidError('Invalid column name');
  }

  return columnName;
};

module.exports = {
  mapLeaderboardDBToModel,
  translateModelColumnNameToDB,
};
