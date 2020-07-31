import { Modal } from "./utils/modal";
export const run = () => {
  if (!("modal_options" in window)) {
    window.modal_options = {};
  }
  const ifawModal = new Modal(window.modal_options);
};
