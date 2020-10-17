const BaseController = require('./Base');

class JsController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  static estance() {
    return JsController;
  }

  get() {
    let file = this.request.params.file || 'index.html';

    this.sendFile(`${this.app.__dirname}/public/js/${file}`);
  }
}

module.exports = JsController;