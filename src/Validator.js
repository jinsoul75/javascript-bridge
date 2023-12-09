const Validator = {
  validateBridgeSize(bridgeSize) {
    this.checkBridgeSize(bridgeSize);
    this.checkIsInteger(bridgeSize);
    this.checkEmpty(bridgeSize, '다리 길이는 3부터 20 사이의 숫자여야 합니다.');
  },

  validateMoving(moving) {
    this.checkEmpty(moving, '위 칸은 대문자 U, 아래 칸은 대문자 D를 입력해주세요.');
    this.checkIsValidMovingWord(moving);
  },

  checkBridgeSize(bridgeSize) {
    if (bridgeSize < 3 || bridgeSize > 20) {
      throw new Error('다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    }
  },

  checkIsInteger(input) {
    if (!Number.isInteger(Number(input))) {
      throw new Error('다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    }
  },

  checkIsNumner(input) {
    if (Number.isNaN(Number(input))) {
      throw new Error('다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    }
  },

  checkEmpty(input, message) {
    if (input.length === 0) {
      throw new Error(message);
    }
  },

  checkIsValidMovingWord(moving) {
    if (moving !== 'U' && moving !== 'D') {
      throw new Error('위 칸은 대문자 U, 아래 칸은 대문자 D를 입력해주세요.');
    }
  },
};

export default Validator;
