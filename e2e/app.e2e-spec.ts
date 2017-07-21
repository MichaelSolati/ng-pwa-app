import { NgPwaAppPage } from './app.po';

describe('ng-pwa-app App', () => {
  let page: NgPwaAppPage;

  beforeEach(() => {
    page = new NgPwaAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to pwa!!');
  });
});
