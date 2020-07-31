import { Modal } from "./utils/modal";
import { Modal2 } from "./utils/modal2";

export const run = () => {
  if (!("modal_options" in window)) {
    window.modal_options = {};
  }
  if (!("modal_options2" in window)) {
    window.modal_options2 = {};
  }

  //console.log(modal_options2);
  const ifawModal = new Modal(window.modal_options);
  const ifawModal2 = new Modal2(window.modal_options2);
  
};
