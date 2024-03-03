module.exports = {
  apps: [
    {
      name: 'web',
      script: './web/index.ts',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'development', //Caso production, mude os valores de ALLOWED_ORIGINS e REST_API_KEY
        PORT: 3000,
        AMQP_URL: 'amqp://guest:guest@localhost:5672',
        ALLOWED_ORIGINS: '',
        REST_API_KEY: ''
      }
    },
    {
      name: 'consumer1',
      script: './consumer/index.ts',
      autorestart: true,
      env: {
        NODE_ENV: 'development',
        AMQP_URL: 'amqp://guest:guest@localhost:5672',
        IA_URL: '.',
        IA_PASS: '.',
      }
    },
    {
      name: 'consumer2',
      script: './consumer/index.ts',
      autorestart: true,
      env: {
        NODE_ENV: 'development',
        AMQP_URL: 'amqp://guest:guest@localhost:5672',
        IA_URL: '.',
        IA_PASS: '.',
      }
    }
  ]
};
