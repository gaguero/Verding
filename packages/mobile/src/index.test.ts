describe('Mobile App', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('should start without errors', () => {
    expect(() => {
      require('./index');
    }).not.toThrow();
  });
});
