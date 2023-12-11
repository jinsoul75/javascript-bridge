import BridgeRandomNumberGenerator from './BridgeRandomNumberGenerator.js';
import BridgeMaker from './BridgeMaker.js';
/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #size;

  #bridge;

  #retry;

  #canMove = true;

  #round = 0;

  #result = [];

  #isDone = false;

  // 재시도, 성공 여부 리턴

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  constructor(size) {
    this.#size = size;
    this.#bridge = BridgeMaker.makeBridge(this.#size, BridgeRandomNumberGenerator.generate);
    console.log(this.#bridge);
  }

  // return 값에 따라 App에서 실행할 함수 달라져야함.
  // 건널 수 없는 값 입력 => false?
  // 모두 다 건넜다 => true?
  move(moving) {
    const result = this.#bridge[this.#round] === moving;

    this.#result.push([moving, result ? 'O' : 'X']);

    this.#canMove = result;

    this.#round += 1;

    if (this.#round === this.#bridge.length) {
      this.#isDone = true;
    }
  }

  getResult() {
    return [...this.#result];
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  // 재시도 값도 상태로 가지고 있어야 함
  // 재시도 할 때는 다리 재사용
  retry() {
    this.#retry += 1;
    this.#result = [];
  }

  getRetry() {
    return this.#retry;
  }

  isDone() {
    return this.#isDone;
  }

  canMove() {
    return this.#canMove;
  }
}

export default BridgeGame;
