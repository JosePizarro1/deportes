require('dotenv').config({ path: '.env.local' });

const config = {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: "sportbnb", // Based on the URI in .env.local

    options: {
      connectTimeoutMS: 3600000,
      socketTimeoutMS: 3600000,
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  lockCollectionName: "changelog_lock",
  lockTtl: 0,
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
