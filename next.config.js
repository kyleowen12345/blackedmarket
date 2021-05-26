module.exports = {
    async headers() {
      return [
        {
          source: '/',
          headers: securityHeaders
        },
        {
          source: '/:path*',
          headers: securityHeaders
        },
      ];
    },
      future: {
        webpack5: true,
      },
      images: {
        domains: ['res.cloudinary.com','www.watsons.com.ph'],
      },
    }
  
    const ContentSecurityPolicy = `
    default-src 'self' blob:;
    script-src 'self'  https://www.paypalobjects.com/api/checkout.js 'unsafe-eval' 'unsafe-inline' *.youtube.com *.paypal.com blob:;
    child-src *.youtube.com *.google.com *.paypal.com;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src * blob: data:;
    worker-src 'self' blob:;
    media-src 'none';
    connect-src *;
    font-src 'self';
    script-src-elem 'self' blob:;
  `;
  const securityHeaders = [
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
    {
      key: 'Content-Security-Policy',
      value: ContentSecurityPolicy.replace(/\n/g, '')
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
    {
      key: 'Referrer-Policy',
      value: 'origin-when-cross-origin'
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    {
      key: 'X-Frame-Options',
      value: 'DENY'
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on'
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=31536000; includeSubDomains; preload'
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    {
      key: 'Feature-Policy',
      value: "camera 'none'; microphone 'none'; geolocation 'none'"
    }
  ];