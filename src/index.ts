/** @prettier */

const KEY_ENTER = 13;
const KEY_SPACE = 32;

const setAriaExpanded = (el: HTMLElement, state: boolean) => {
  el.setAttribute('aria-expanded', `${state}`);
};

const toggleHandle = (el: HTMLElement) => {
  const currentState = el.getAttribute('aria-expanded') === 'true';
  const nextState = !currentState;

  setAriaExpanded(el, nextState);
  return nextState;
};

const setPanels = (ids: Array<string>, state: boolean) => {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      toggleAriaHidden(el, state);
      toggleHeight(el, state);
    }
  });
};

const toggleAriaHidden = (el: HTMLElement, state: boolean) => {
  el.setAttribute('aria-hidden', `${!state}`);
};

const setPanelDataHeight = (el: HTMLElement) => {
  el.style.height = 'auto';
  const height = el.clientHeight;
  el.dataset.height = `${height}`;
};

const setPanelStyle = (el: HTMLElement, state: boolean) => {
  const height = state ? el.dataset.height + 'px' : '0';
  el.style.height = height;
};

const toggleHeight = (el: HTMLElement, state: boolean) => {
  const enabled = el.dataset.enableHeightStyle !== 'false';
  if (!enabled) {
    return;
  }

  if (!el.dataset.height) {
    setPanelDataHeight(el);
  }

  setPanelStyle(el, state);
};

export const expandController = (): void => {
  const elHandles = document.querySelectorAll('.js-expand-controller[aria-controls]');

  Array.prototype.slice.call(elHandles, 0).forEach((elHandle) => {
    const elPanelIds = elHandle.getAttribute('aria-controls').split(' ');

    const handler = (e: Event) => {
      const disableEvents = elHandle.dataset.disableEvents?.split(' ') || [];
      disableEvents.forEach((type: string) => {
        switch (type) {
          case 'prevent':
            e.preventDefault();
            break;
          case 'stop':
            e.stopPropagation();
            break;
        }
      });

      const state = toggleHandle(elHandle);
      setPanels(elPanelIds, state);
    };

    elHandle.addEventListener('click', handler);

    if (elHandle.getAttribute('role') === 'button') {
      elHandle.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode === KEY_ENTER || e.keyCode === KEY_SPACE) {
          handler(e);
        }
      });
    }

    // initialization
    const ariaExpanded = elHandle.getAttribute('aria-expanded');
    const initialState = ariaExpanded === null ? false : ariaExpanded === 'true';
    setAriaExpanded(elHandle, initialState);
    setPanels(elPanelIds, initialState);
  });

  // reset panel height
  window.addEventListener('resize', () => {
    Array.prototype.slice.call(elHandles, 0).forEach((elHandle) => {
      const elPanelIds = elHandle.getAttribute('aria-controls').split(' ');
      elPanelIds.forEach((id: string) => {
        const elPanel = document.getElementById(id);
        if (!elPanel || elPanel.dataset.enableHeightStyle === 'false') {
          return;
        }

        setPanelDataHeight(elPanel);
        setPanelStyle(elPanel, elPanel.getAttribute('aria-hidden') === 'false');
      });
    });
  });
};
