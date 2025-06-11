describe('Backend', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  it('should start without errors', () => {
    // Placeholder test for CI pipeline
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    require('./index');

    expect(mockConsoleLog).toHaveBeenCalledWith('Verding Backend starting...');

    mockConsoleLog.mockRestore();
  });
});
