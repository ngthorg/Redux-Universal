
module.exports = {
  production: {
    API_URL: 'https://api.github.com',
  },
  development: {
    API_URL: 'https://api.github.com',
  },
  test: {
    API_URL: 'https://api.github.com',
  },
}[process.env.NODE_ENV || 'development'];
