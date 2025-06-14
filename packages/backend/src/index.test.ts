describe('Backend', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('should import app without starting server', () => {
    process.env.NODE_ENV = 'test';
    const { default: app } = require('./index');
    expect(app).toBeDefined();
  });
});
