describe('initGame', () => {
  let documentMock;
  let ioMock;
  let gameMode;

  beforeEach(() => {
    documentMock = {
      querySelector: jest.fn(),
      querySelectorAll: jest.fn(),
    };
    ioMock = jest.fn();
    gameMode = 'singlePlayer';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create user and computer grids', () => {
    initGame(documentMock, gameMode);
    expect(documentMock.querySelector).toHaveBeenCalledWith('.grid-user');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.grid-computer');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.grid-display');
  });

  it('should select player mode', () => {
    initGame(documentMock, gameMode);
    expect(documentMock.querySelector).toHaveBeenCalledWith('#start');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#rotate');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#whose-go');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#info');
    expect(documentMock.getElementById).toHaveBeenCalledWith('setup-buttons');
  });

  it('should generate ships for single player mode', () => {
    gameMode = 'singlePlayer';
    initGame(documentMock, gameMode);
    expect(documentMock.querySelector).toHaveBeenCalledWith('.ship');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.destroyer-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.submarine-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.cruiser-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.battleship-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.carrier-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#start');
  });

  it('should generate ships for multiplayer mode', () => {
    gameMode = 'multiPlayer';
    initGame(documentMock, gameMode);
    expect(documentMock.querySelector).toHaveBeenCalledWith('.ship');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.destroyer-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.submarine-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.cruiser-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.battleship-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.carrier-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#start');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#start');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#rotate');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#whose-go');
    expect(documentMock.querySelector).toHaveBeenCalledWith('#info');
    expect(documentMock.getElementById).toHaveBeenCalledWith('setup-buttons');
    expect(ioMock).toHaveBeenCalled();
  });

  it('should rotate the ships', () => {
    gameMode = 'singlePlayer';
    initGame(documentMock, gameMode);
    const rotateButton = documentMock.querySelector.mock.results[0].value;
    rotateButton.addEventListener.mock.calls[0][1]();
    expect(documentMock.querySelector).toHaveBeenCalledWith('.destroyer-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.submarine-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.cruiser-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.battleship-container');
    expect(documentMock.querySelector).toHaveBeenCalledWith('.carrier-container