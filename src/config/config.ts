const config = {
  nest: {
    port: process.env.PORT,
    apiVersion: process.env.API_VERSION,
  },

  cors: {
    enabled: true,
  },

  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default () => config;
