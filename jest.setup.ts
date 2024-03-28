jest.mock('./src/services/redis-commands/client');

require('dotenv').config({ path: './.test.env' });

Promise.resolve().then(() => {});
