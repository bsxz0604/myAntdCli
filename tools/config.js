module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8004,
  apiHost: process.env.API_HOST || 'XXXXXXXXXXXXX',
  commitId: process.env.COMMIT_ID,
}

