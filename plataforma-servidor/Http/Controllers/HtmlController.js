const BaseController = require('./Base');

class HtmlController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  static estance() {
    return HtmlController;
  }

  get() {
    let file = this.request.params.file || 'index.html';

    this.sendFile(`${this.app.__dirname}/public/html/${file}`);
  }
}

module.exports = HtmlController;