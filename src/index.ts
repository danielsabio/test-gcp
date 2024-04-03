import 'dotenv/config';

import bodyParser from 'body-parser';
import express from 'express';
import * as process from 'process';

import { config } from './infra/config';
import { Logger } from './infra/logger';
import { handleRequest } from './routing/root';

const bootstrap = async () => {
  try {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.post('/', async (req, res) => {
      const response = await handleRequest(req.body);
      return res.json(response);
    });

    app.listen(config.PORT || 8081);

    Logger.info('= = = = =');
    Logger.info('SERVER IS STARTED: ', { ...config });
    Logger.info('= = = = =');
    Logger.info('testing devops - this is to be deleted');
  } catch (error) {
    Logger.error('SERVER FAILED TO START. ERROR: ', error);
    process.exit(1);
  }
};

void bootstrap();
