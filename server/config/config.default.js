'use strict';

const _ = require('xutil');
const fs = require('fs');
const path = require('path');

const sequelizeConfig = require('../database/config');

module.exports = appInfo => {

  const config = exports = {};

  // debug 为 true 时，用于本地调试
  config.debug = true;

  config.siteLogo = '/public/logo/logo.svg';

  config.siteFile = {
    '/favicon.ico': '/public/favicon.ico',
  };

  config.keys = appInfo.name;

  config.middleware = [
    'exportData',
    'errorHandler',
  ];

  config.exportData = {
    match(ctx) {
      const datahubClient = ctx.get('x-datahub-client');
      return datahubClient === 'datahub-view' && [
        '/api/project',
        '/api/interface',
        '/api/scene',
        '/api/schema',
      ].some(path => ctx.path.startsWith(path))
      && [ 'POST', 'PUT', 'DELETE' ].includes(ctx.method);
    },
  };

  config.notfound = {
    pageUrl: '/notfound',
  };

  // for datahub-view
  config.dataHubView = {
    assetsUrl: 'http://0.0.0.0:9200/public/',
  };

  config.dataHubRpcType = process.env.DATAHUB_RPC_PROTOCOL || 'http';

  config.dataHubSocket = {
    port: process.env.DATAHUB_SOCKET_IO_PORT || 9300,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    methodnoallow: {
      enable: false,
    },
  };

  config.logger = {
    consoleLevel: 'ERROR',
  };

  config.i18n = {
    defaultLocale: 'en_US',
    queryField: 'locale',
    cookieField: 'locale',
    cookieMaxAge: '1y',
  };

  config.bodyParser = {
    formLimit: '500kb',
    jsonLimit: '500kb',
  };

  config.sequelize = sequelizeConfig;

  config.modelCommonOption = {
    underscored: false,
  };

  if (process.env.DATAHUB_STORE_PATH) {
    const storeDir = path.resolve(process.env.DATAHUB_STORE_PATH);
    if (!_.isExistedDir(storeDir)) fs.mkdirSync(storeDir);
    config.exportArchiveBaseDir = storeDir;
  }

  config.exportExcludeAttributes = [ 'createdAt', 'updatedAt' ];

  return config;

};

