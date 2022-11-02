function on(eventName, listener) {
  const callListener = ({ detail }) => {
    listener(detail);
  };

  window.addEventListener(eventName, callListener);

  return () => {
    window.removeEventListener(eventName, callListener);
  };
}

function emit(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBusService = { on, emit };

export function showToastMessage(toastMessage) {
  eventBusService.emit('show-toast-message', toastMessage);
}
export function showSuccessMsg(toastMessage) {
  showToastMessage({ ...toastMessage, type: 'success' });
}
export function showErrorMsg(toastMessage) {
  showToastMessage({ ...toastMessage, type: 'error' });
}

// window.myBus = eventBusService;
// window.showToastMessage = showToastMessage;
