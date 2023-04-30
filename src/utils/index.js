/* eslint-disable camelcase */
const mapLeaderboardDBToModel = ({
  id,
  level,
  username,
  steps,
  commands,
  time_ms,
  created_at,
}) => ({
  id,
  level,
  username,
  steps,
  commands,
  timeMs: time_ms,
  createdAt: created_at,
});

module.exports = {mapLeaderboardDBToModel};
