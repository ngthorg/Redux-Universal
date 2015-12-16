
module.exports = {
  development: {
    API_URL: "http://example.com/api",
  },
  production: {
    API_URL: "http://example.com/api",
  }
}[process.env.NODE_ENV || 'development'];
