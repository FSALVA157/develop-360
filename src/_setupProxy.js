import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://metaverso.griftin.com.ar',
      changeOrigin: true,
      pathRewrite: { '^/api': '/app/v1' },
    })
  );
};
