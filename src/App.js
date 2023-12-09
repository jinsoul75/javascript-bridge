import InputView from './InputView.js';
import OutputView from './OutputView.js';
import Validator from './Validator.js';

class App {
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
      return this.#getMoving();
    } catch (error) {
      OutputView.printError(error.message);
      return this.#getBridgeSize();
    }
  }

  #getMoving() {
    console.log('실행대따?');
  }
}

const app = new App();

app.play();

export default App;
