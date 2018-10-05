import { AstartPage } from './app.po';

describe('FacebotClient App', function() {
  let page: AstartPage;

  beforeEach(() => {
    page = new AstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
