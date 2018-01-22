module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8002,
  apiHost: process.env.API_HOST || 'https://ops.dev.musical.ly/',
  commitId: process.env.COMMIT_ID,
}
