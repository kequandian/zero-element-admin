import _window from 'zero-element/lib/utils/window';

export function get(): string | undefined {
  const winZEle = _window.ZEle;

  if (winZEle) {
    return winZEle.pageServer;
  }
}

export function set(pageServer: string): void {
  if (_window.ZEle) {
    _window.ZEle.pageServer = pageServer;
  }
}

export function getid(): string | undefined {
  const winZEle = _window.ZEle;

  if (winZEle) {
    return winZEle.currentPageId;
  }
}

export function setid(pageId: string): void {
  if (_window.ZEle) {
    _window.ZEle.currentPageId = pageId;
  }
}
