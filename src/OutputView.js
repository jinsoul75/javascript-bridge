import { Console } from '@woowacourse/mission-utils';
/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printError(error) {
    Console.print(`[ERROR] ${error}`);
  },

  printStart() {
    Console.print('다리 건너기 게임을 시작합니다.');
  },
  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */

  // TODO: 좀 더 간결하게 만들기
  printMap(movingLog) {
    const result = ([moving, canMove], position) =>
      moving === position && canMove === 'O'
        ? ' O '
        : moving === position && canMove === 'X'
          ? ' X '
          : '   ';

    Console.print(
      `[${movingLog.map(moving => result(moving, 'U')).join('|')}]\n[${movingLog
        .map(moving => result(moving, 'D'))
        .join('|')}]`,
    );
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(result, isSuccess, retryNumber) {
    Console.print('\n최종 게임 결과');
    this.printMap(result);
    Console.print(`\n게임 성공 여부: ${isSuccess ? '성공' : '실패'}`);
    Console.print(`총 시도한 횟수: ${retryNumber}`);
  },
};

export default OutputView;
