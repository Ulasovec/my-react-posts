module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c6b01ba1a41abecf5a41e655cd0fc397'),
  },
});
