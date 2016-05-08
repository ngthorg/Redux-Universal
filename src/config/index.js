
module.exports = {
  development: {
    API_URL: 'https://api.github.com',
  },
  production: {
    API_URL: 'https://api.github.com',
  },
}[process.env.NODE_ENV || 'development'];
