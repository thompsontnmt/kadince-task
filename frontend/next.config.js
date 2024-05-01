module.exports = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/to-do-list',
        },
      ];
    },
  };