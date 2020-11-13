import crumbs from "./crumbs";

/**
 * Options:
 *
 * title - Title of the Splash Screen
 * paragraph - Content of the Splash Screen
 * amounts - Array with numbers for the donation amounts
 * currency - Symbol used next to the donation amounts
 * currency_position - (left|right) Currency position
 * other_label - Label for the "Other Amount" field
 * cta_label - Label for the call-to-action button
 * donation_link - Link to the Donation Page
 * background - URL to the background image
 * background_credit - Credits to the image
 * align - (left|right) - Container's alignment
 * start_date - Date to Start the Campaign
 * end_date - Date to end the Campaign
 * cookie_ttl - Hours (number) to wait until showing the popup again
 *
 */
export class Modal {
  constructor(options) {
    this.options = Object.assign(
      {
        title: "",
        paragraph: "",
        amounts: [50, 100, 250, 500],
        currency: "$",
        currency_position: "left",
        other_label: "other amount",
        cta_label: "give now",
        donation_link: "",
        start_date: "",
        end_date: "",
        background: "",
        background_credit: "",
        align: "right",
        cookie_ttl: 4,
        debug: false,
      },
      options
    );
    if (!this.shouldRun()) {
      // If we're not between the running dates, get out
      return false;
    }
    const markup = `
    <div class="desktop_bg ${
      this.options.align
    }" style="background-image: url('${this.options.background}');"></div>
    <div class="ifawSplash-container ${this.options.align}">
        <a href="javascript:void(0)" class="button-close"></a>
        <span href="#" class="logo">IFAW</span>
        <div class="container ${this.options.align}">
          <h1 class="title"><span>${this.options.title}</span></h1>
          ${
            this.options.paragraph
              ? "<p><span>" + this.options.paragraph + "</span></p>"
              : ""
          }
          <div class="amounts">
          ${this.getAmounts()}
          </div>
          <a class="cta" target="_blank" href="${this.options.donation_link}">${
      this.options.cta_label
    }</a>
        </div>
        ${
          this.options.background_credit
            ? "<p class='credits'>© " + this.options.background_credit + "</p>"
            : ""
        }
        <div class="giving-tuesday-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="228" height="22" fill="none" viewBox="0 0 228 22">
          <path fill="#fff" d="M10.915 1.259c4.644 0 7.078 2.266 7.078 2.266l-1.378 1.97c-1.565-1.185-3.493-1.832-5.48-1.839-4.574 0-7.325 3.225-7.325 7.252 0 4.372 3.095 7.384 7.159 7.384 2.08-.049 4.056-.884 5.507-2.327v-2.738H13.31v-2.293h5.642v9.463h-2.395v-1.173c0-.4.03-.801.03-.801h-.057c-.791.744-1.726 1.33-2.751 1.723-1.026.393-2.121.587-3.224.57C5.323 20.715 1 16.714 1 10.96c0-5.44 4.241-9.702 9.915-9.702z"/>
          <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.48" d="M10.915 1.259c4.644 0 7.078 2.266 7.078 2.266l-1.378 1.97c-1.565-1.185-3.493-1.832-5.48-1.839-4.574 0-7.325 3.225-7.325 7.252 0 4.372 3.095 7.384 7.159 7.384 2.08-.049 4.056-.884 5.507-2.327v-2.738H13.31v-2.293h5.642v9.463h-2.395v-1.173c0-.4.03-.801.03-.801h-.057c-.791.744-1.726 1.33-2.751 1.723-1.026.393-2.121.587-3.224.57C5.323 20.715 1 16.714 1 10.96c0-5.44 4.241-9.702 9.915-9.702z"/>
          <path fill="#fff" d="M25.95 1.577h-2.73v18.82h2.73V1.577z"/>
          <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.48" d="M25.95 1.577h-2.73v18.82h2.73V1.577z"/>
          <path fill="#fff" d="M62.272 1.577h-2.728v18.82h2.728V1.577z"/>
          <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.48" d="M62.272 1.577h-2.728v18.82h2.728V1.577z"/>
          <path fill="#fff" d="M67.558 1.577h2.71l8.617 12.235c.716 1.015 1.626 2.719 1.626 2.719h.054s-.19-1.678-.19-2.72V1.578h2.71v18.82h-2.652L71.77 8.189c-.716-1.042-1.622-2.746-1.622-2.746h-.058s.194 1.678.194 2.746v12.208h-2.71l-.015-18.82z"/>
          <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.48" d="M67.558 1.577h2.71l8.617 12.235c.716 1.015 1.626 2.719 1.626 2.719h.054s-.19-1.678-.19-2.72V1.578h2.71v18.82h-2.652L71.77 8.189c-.716-1.042-1.622-2.746-1.622-2.746h-.058s.194 1.678.194 2.746v12.208h-2.71l-.015-18.82z"/>
          <path fill="#fff" d="M97.024 1.259c4.643 0 7.078 2.266 7.078 2.266l-1.378 1.97c-1.565-1.185-3.493-1.832-5.48-1.839-4.574 0-7.326 3.225-7.326 7.252 0 4.372 3.096 7.384 7.16 7.384 2.08-.049 4.056-.884 5.507-2.327v-2.738h-3.166v-2.293h5.646v9.463h-2.399v-1.173c0-.4.027-.801.027-.801h-.054c-.791.744-1.726 1.33-2.751 1.723-1.026.393-2.122.587-3.224.57-5.232 0-9.555-3.998-9.555-9.74 0-5.44 4.257-9.702 9.915-9.702"/>
          <path stroke="#fff" stroke-miterlimit="10" stroke-width="1.48" d="M97.024 1.259c4.643 0 7.078 2.266 7.078 2.266l-1.378 1.97c-1.565-1.185-3.493-1.832-5.48-1.839-4.574 0-7.326 3.225-7.326 7.252 0 4.372 3.096 7.384 7.16 7.384 2.08-.049 4.056-.884 5.507-2.327v-2.738h-3.166v-2.293h5.646v9.463h-2.399v-1.173c0-.4.027-.801.027-.801h-.054c-.791.744-1.726 1.33-2.751 1.723-1.026.393-2.122.587-3.224.57-5.232 0-9.555-3.998-9.555-9.74 0-5.454 4.241-9.717 9.915-9.717z"/>
          <path fill="#fff" d="M29.873 5.645c-.118.747-.066 1.509.152 2.234.219.725.599 1.394 1.114 1.962l10.917 10.57 1.548-1.498-13.73-13.268zM38.921 2.547c-1.013-.913-2.35-1.415-3.734-1.4-.239.004-.476.023-.712.055l13.838 13.389 1.548-1.499-10.94-10.545z"/>
          <path fill="#fff" d="M50.21 1c-1.338.011-2.623.502-3.607 1.379L35.02 13.587l1.548 1.498L51.022 1.06c-.268-.042-.54-.062-.813-.06M53.259 1.87L38.252 16.38l1.547 1.499L54.788 3.356c-.4-.593-.92-1.103-1.529-1.498M55.693 6.203c-.005-.235-.025-.47-.062-.704L41.142 19.52 42.69 21 54.346 9.71c.882-.968 1.361-2.217 1.347-3.507"/>
          <path fill="#fff" d="M32.253 2.019c-.303.193-.586.415-.843.663l-.074.071c-.229.232-.436.482-.62.75l15.02 14.549 1.548-1.498-15.03-14.535zM44.916 8.347L43.383 9.83l3.358 3.255 1.534-1.483-3.358-3.255zM38.78 14.274l-1.532 1.483 3.428 3.32 1.532-1.484-3.428-3.32z"/>
          <path fill="#fff" d="M41.684 16.03l-1.528-1.484 3.486-3.372 1.533 1.48-3.49 3.375zM115.348 3.87h-6.664V1.577h16.056V3.87h-6.664v16.527h-2.728V3.87zM127.259 1.577h2.709v12.14c0 2.882 1.935 4.56 4.899 4.56 2.965 0 4.958-1.678 4.958-4.612V1.577h2.708v12.14c0 4.185-3.095 6.983-7.658 6.983-4.563 0-7.616-2.783-7.616-6.982V1.578zM147.568 1.577h11.289V3.87h-8.564v5.888h6.969v2.297h-6.969v6.05h9.036v2.292h-11.761V1.577zM163.4 16.239s2.066 2.026 4.957 2.026c1.819 0 3.363-.989 3.363-2.772 0-4.079-9.419-3.199-9.419-8.99 0-2.933 2.616-5.244 6.277-5.244s5.507 1.891 5.507 1.891l-1.243 2.188c-1.183-1-2.686-1.576-4.256-1.63-2.063 0-3.526 1.255-3.526 2.746-.008 3.892 9.412 2.855 9.412 8.957 0 2.907-2.322 5.304-6.169 5.304-2.401.031-4.718-.859-6.443-2.476l1.54-2zM184.634 18.104c4.381 0 7.252-2.513 7.252-7.143s-2.902-7.091-7.252-7.091h-3.525v14.234h3.525zM178.38 1.577h6.448c5.948 0 9.856 3.439 9.856 9.384s-3.908 9.436-9.856 9.436h-6.448V1.577zM204.626 4.162s-.441 1.708-.774 2.667l-2.175 5.971h5.894l-2.14-5.971c-.329-.959-.743-2.667-.743-2.667h-.062zm3.661 10.822h-7.326l-1.935 5.413h-2.809l7.004-18.82h2.864l6.993 18.82h-2.833l-1.958-5.413zM218.751 12.425l-6.525-10.863h3.096l3.607 6.185c.608 1.041 1.184 2.37 1.184 2.37h.054s.581-1.303 1.185-2.37l3.552-6.185H228l-6.498 10.863v7.972h-2.728l-.023-7.972z"/>
      </svg>
        </div>
    </div>`;
    let overlay = document.createElement("div");
    overlay.id = "ifawSplash";
    overlay.classList.add("is-hidden");
    overlay.innerHTML = markup;
    const closeButton = overlay.querySelector(".button-close");
    const amounts_cta = overlay.querySelectorAll(".amount, .cta");
    closeButton.addEventListener("click", this.close.bind(this));
    amounts_cta.forEach((el) =>
      el.addEventListener("click", this.close.bind(this))
    );
    closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        closeButton.click();
      }
    });
    this.overlay = overlay;
    document.body.appendChild(overlay);
    window.setTimeout(this.open.bind(this), 500); //Delay before opening splash screen
  }
  shouldRun() {
    let start = new Date(this.options.start_date);
    let end = new Date(this.options.end_date);
    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);
    let now = new Date();
    if (this.options.debug) {
      console.log("Start", start);
      console.log("End", end);
      console.log("Now", now);
    }
    return now >= start || now <= end;
  }
  open() {
    let hideSplash = crumbs.get("hideSplash"); // Get cookie
    if (!hideSplash || this.options.debug) {
      this.overlay.classList.remove("is-hidden");
    }
  }
  close(e) {
    crumbs.set("hideSplash", 1, {
      type: "hour",
      value: this.options.cookie_ttl,
    }); // Create a cookie
    this.overlay.classList.add("is-hidden");
  }
  getAmounts() {
    let ret = "";
    this.options.amounts.forEach(
      (e) =>
        (ret =
          ret +
          `<a class="amount amount_${this.options.currency_position}" target="_blank" href="${this.options.donation_link}?amount=${e}"><span class="currency">${this.options.currency}</span><span class="amount_value">${e}</span></a>`)
    );
    ret += `<a class="amount other_amount" target="_blank" href="${this.options.donation_link}"><span>${this.options.other_label}</span></a>`;
    return ret;
  }
}
