import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';
import BridgeGame from './BridgeGame.js';

class App {
  #bridgeGame;

  async play() {
    OutputView.printStart();

    await this.retryHandler(() => this.#getBridgeSize());

    await this.#crossBridge();

    OutputView.printResult(
      this.#bridgeGame.getResult(),
      this.#bridgeGame.isSuccess(),
      this.#bridgeGame.getRetryNumber(),
    );
  }

  // TODO: while문 안의 await
  async #crossBridge() {
    while (!this.#bridgeGame.isDone()) {
      const moving = await this.#getMoving();

      this.#bridgeGame.move(moving);

      OutputView.printMap(this.#bridgeGame.getResult());

      if (!this.#bridgeGame.canMove()) {
        await this.retryHandler(() => this.#askRety());
        break;
      }
    }
  }

  async retryHandler(callback) {
    try {
      return await callback();
    } catch (error) {
      OutputView.printError(error.message);
      return this.retryHandler(callback);
    }
  }

  async #getBridgeSize() {
    const bridgeSize = await InputView.readBridgeSize();

    Validator.validateBridgeSize(bridgeSize);

    this.#bridgeGame = new BridgeGame(bridgeSize);

    return bridgeSize;
  }

  async #getMoving() {
    const moving = await InputView.readMoving();

    Validator.validateMoving(moving);

    return moving;
  }

  async #askRety() {
    const answer = await InputView.readGameCommand();

    Validator.validateRetry(answer);

    if (answer === 'R') {
      this.#bridgeGame.retry();
      return this.#crossBridge();
    }
  }
}

export default App;
