import 'dotenv/config';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { ConnectionOptions, createConnection } from 'typeorm';
import app from './app';
import entities from './entities';

const Options: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities,
};

const _bootStrap = async () => {
  await createConnection(Options);

  // SSL config
  const configurations = {
    production: { ssl: true, port: 443, host: 'paysys.kr' },
    development: { ssl: false, port: 4000, host: 'localhost' },
  };
  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];

  let httpServer;
  let httpsServer;

  if (config.ssl) {
    httpServer = http.createServer(app.callback());
    httpsServer = https.createServer(
      {
        key: fs.readFileSync(`${process.env.SSL_KEY}`),
        cert: fs.readFileSync(`${process.env.SSL_CERT}`),
      },
      app.callback()
    );

    httpServer.listen(80);
    httpsServer.listen(config.port, () => {
      console.log(`> Paysys Shop server on ${config.port} port`);
    });
  } else {
    httpServer = http.createServer(app.callback());

    httpServer.listen(config.port, () => {
      console.log(`> Dev server on ${config.port} port`);
    });
  }
};

_bootStrap();
