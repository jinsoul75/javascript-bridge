import OutputView from './OutputView.js';

class App {
  play() {
    OutputView.printStart();
  }
}

const app = new App();

app.play();

export default App;
