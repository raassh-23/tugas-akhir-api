/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('leaderboard', {
    id: 'id',
    level: {
      type: 'integer',
      notNull: true,
    },
    username: {
      type: 'varchar(100)',
      notNull: true,
    },
    steps: {
      type: 'integer',
      notNull: true,
    },
    commands: {
      type: 'integer',
      notNull: true,
    },
    time_ms: {
      type: 'integer',
      notNull: true,
    },
    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('leaderboard');
};
