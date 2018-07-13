export default {
  appName: 'Gennyrator API',
  version: process.env.VERSION || 'unknown',
  api: {
    port: 2090
  },
  logging: {
    errorFile: 'logs/error.log',
    logFile: 'logs/combined.log'
  },
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost/gennyrator'
  },
  authentication: {
    enabled: true,
    secret: process.env.AUTH_SECRET || 'TqVhOHmlepqYuIwepYhrgmE7iXTKprW6',
  },
  defaultUsers: [
    {
      type: 'ADMIN',
      firstName: process.env.DEFAULT_ADMIN_USER_FIRST_NAME || 'Matt',
      lastName: process.env.DEFAULT_ADMIN_USER_LAST_NAME || 'Hayward',
      email: process.env.DEFAULT_ADMIN_USER_EMAIL || 'admin@gada.io',
      password: process.env.DEFAULT_ADMIN_USER_PASSWORD || 'password'
    }
  ],
  web: {
    path: process.env.WEB_BASE || 'http://localhost:3000'
  }
};
