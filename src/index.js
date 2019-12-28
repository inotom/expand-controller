/** @prettier */

const setAriaExpanded = (el, state) => {
  el.setAttribute('aria-expanded', state);
};

const toggleHandle = el => {
  const currentState = el.getAttribute('aria-expanded') === 'true';
  const nextState = !currentState;

  setAriaExpanded(el, nextState);
  return nextState;
};

const setPanels = (ids, state) => {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      toggleAriaHidden(el, state);
      toggleHeight(el, state);
    }
  });
};

const toggleAriaHidden = (el, state) => {
  el.setAttribute('aria-hidden', !state);
};

const toggleHeight = (el, state) => {
  const enabled = el.dataset.enableHeightStyle !== 'false';
  if (!enabled) {
    return;
  }

  if (!el.dataset.height) {
    const height = el.clientHeight;
    el.dataset.height = height;
  }

  const nextHeightValue = state ? el.dataset.height + 'px' : 0;
  el.style.height = nextHeightValue;
};

export const expandController = () => {
  const elHandles = document.querySelectorAll('.js-expand-controller[aria-controls]');

  Array.prototype.slice.call(elHandles, 0).forEach(elHandle => {
    const elPanelIds = elHandle.getAttribute('aria-controls').split(' ');

    elHandle.addEventListener('click', () => {
      const state = toggleHandle(elHandle);
      setPanels(elPanelIds, state);
    });

    // initialization
    const ariaExpanded = elHandle.getAttribute('aria-expanded');
    const initialState = ariaExpanded === null ? false : ariaExpanded === 'true';
    setAriaExpanded(elHandle, initialState);
    setPanels(elPanelIds, initialState);
  });
};