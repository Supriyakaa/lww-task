import httpProxyMiddleware from 'next-http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  return httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_URL,
    pathRewrite: [{
      patternStr: '^/api/',
      replaceStr: '',
    }],
  });
};