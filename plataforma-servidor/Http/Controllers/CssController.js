const BaseController = require('./Base');

class CssController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  static estance() {
    return CssController;
  }

  get() {
    let file = this.request.params.file || 'index.html';

    this.sendFile(`${this.app.__dirname}/public/css/${file}`);
  }
}

module.exports = CssController;