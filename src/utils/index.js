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
  }

  return columnName;
};

module.exports = {
  mapLeaderboardDBToModel,
  translateModelColumnNameToDB,
};
