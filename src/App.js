import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';
import BridgeGame from './BridgeGame.js';

class App {
  #size;

  #moving;

  #bridgeGame;

  play() {
    OutputView.printStart();
    this.#getBridgeSize();
  }

  #getBridgeSize() {
    InputView.readBridgeSize(this.#validateBridgeSize.bind(this));
  }

  #validateBridgeSize(bridgeSize) {
    try {
      Validator.validateBridgeSize(bridgeSize);
      this.#size = bridgeSize;
      this.#bridgeGame = new BridgeGame(bridgeSize);
      return this.#getMoving();
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getBridgeSize();
    }
  }

  #getMoving() {
    InputView.readMoving(this.#validateMoving.bind(this));
  }

  #getMovingAgain() {
    InputView.readMoving(this.#validateMovingAgain.bind(this));
  }

  #validateMoving(moving) {
    try {
      Validator.validateMoving(moving);
      this.#moving = moving;
      return this.#moveBridge();
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getMoving();
    }
  }

  #validateMovingAgain(moving) {
    try {
      Validator.validateMoving(moving);
      this.#moving = moving;
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getMoving();
    }
  }

  // 일단 다리 길이 만큼 반복
  // 종료 전 map 먼저 print
  // 실패하는 경우 :  움직일 수 없는 방향 입력시
  // 결과값 나오는 경우: 다리 길이만큼이 되었을 때

  #moveBridge() {
    let position = 0;

    while (position < this.#size) {
      const result = this.#bridgeGame.move(this.#moving, position);
      OutputView.printMap(result);
      position += 1;
      this.#getMovingAgain();
    }

    this.#getResult();
  }

  #askContinue() {
    console.log('계속할꺼냐?');
  }

  #getResult(result, retry) {
    console.log(result, retry);
  }
}

const app = new App();

app.play();

export default App;
