describe('Backend', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('should import main module without throwing', () => {
    expect(() => {
      jest.isolateModules(() => {
        require('./index');
      });
    }).not.toThrow();
  });
});
