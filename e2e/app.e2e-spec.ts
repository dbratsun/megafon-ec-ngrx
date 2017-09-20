import { MegafonEcNgrxPage } from './app.po';

describe('megafon-ec-ngrx App', () => {
  let page: MegafonEcNgrxPage;

  beforeEach(() => {
    page = new MegafonEcNgrxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
