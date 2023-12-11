import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';
import BridgeGame from './BridgeGame.js';

class App {
  #bridgeGame;

  async play() {
    OutputView.printStart();

    const size = await this.retryHandler(() => this.#getBridgeSize());

    // const [result, isSuccess, attemptNumber]   =
    await this.#crossBridge(size);

    // OutputView.printResult(result, isSuccess, attemptNumber);
  }

  async #crossBridge() {
    // 다리의 길이만큼 시도했다면 result Return
    // result가 X라면 InputView Return
    while (!this.#bridgeGame.isDone()) {
      const moving = await this.#getMoving();

      this.#bridgeGame.move(moving);

      OutputView.printMap(this.#bridgeGame.getResult());
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
  // 일단 다리 길이 만큼 반복
  // 종료 전 map 먼저 print
  // 실패하는 경우 :  움직일 수 없는 방향 입력시
  // 결과값 나오는 경우: 다리 길이만큼이 되었을 때
  // 게임 진행상황은 어디서 알고 있어야 하나 ? => 브릿지 게임 클래스가 갖자.
}

const app = new App();

app.play();

export default App;
