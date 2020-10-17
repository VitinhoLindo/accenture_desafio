const BaseController = require('./Base');

class RootController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  static estance() {
    return RootController;
  }

  getButton(button = '') {
    let buttons = {
      '1': ['°'],
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z'],
      '*': ['+'],
      '0': ['_'],
      '#': ['º']
    };

    return buttons[button] || [];
  }

  getValueArray(index = 0, array = []) {
    let len = array.length;
    index--;
    return array[index];
  }

  getLatter(button, clicks) {
    let count = 0, index = 1, latter = '', maxCLick = 20;
    if (!clicks) clicks = 1;

    while(true) {
      let latters = this.getButton(button);

      if ((count == clicks) || (count == maxCLick)) {
        latter = latters[index - 1];
        break;
      }

      if (index == latters.length) {
        index = 1;
      } else {
        if (count)
          index++;
      }

      count++;
    }

    return latter;
  }

  get() {
    let all = this.all();

    let validator = this.Validator.make(this.all(), {
      button: 'required|number',
      clicks: 'required|number'
    });


    if (validator.fails()) 
      return this.defaultResponseJSON(validator.modelResponse());



    return this.defaultResponseJSON({
      result: {
        latter: this.getLatter(all.button, all.clicks)
      }
    });
  }
}

module.exports = RootController;