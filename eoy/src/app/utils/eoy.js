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
export class EOY {
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
        blacklist: [],
        whitelist: [],
        background: "",
        background_credit: "",
        align: "right",
        cookie_ttl: 24,
        debug: false,
      },
      options
    );
    if (!this.shouldRun()) {
      // If we're not between the running dates, get out
      return false;
    }
    // Create a cookie with value as 0 if script can run
    crumbs.set("hideSplash", 0, {
      type: "hour",
      value: 1,
    });
    const markup = `
    <div class="desktop_bg ${
      this.options.align
    }" style="background-image: url('${this.options.background}');"></div>
    <div class="ifawEOY-container ${this.options.align}">
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
    </div>`;
    let overlay = document.createElement("div");
    overlay.id = "ifawEOY";
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
  // Should we run the script?
  shouldRun() {
    let hidePopup = !!parseInt(crumbs.get("hideSplash")); // Get cookie
    return (
      !hidePopup &&
      !this.isBlacklisted() &&
      this.isWhitelisted() &&
      this.isBetweenDates()
    );
  }
  isBetweenDates() {
    var ret = false;
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
    ret = now >= start && now <= end;
    console.log("Is betwen Dates?", ret);
    return ret;
  }
  isWhitelisted() {
    var ret = true;
    if (this.options.whitelist.length) {
      var url = window.location.pathname;
      // Change the default since now we need to show ONLY in whitelisted places
      ret = false;
      this.options.whitelist.forEach((test) => {
        console.log("Checking Whitelist", test);
        if (url.match(new RegExp(test))) ret = true;
      });
    }
    console.log("Is Whitelisted?", ret);
    return ret;
  }
  isBlacklisted() {
    var ret = false;
    if (this.options.blacklist.length) {
      var url = window.location.pathname;
      this.options.blacklist.forEach((test) => {
        console.log("Checking Blacklist", test);
        if (url.match(new RegExp(test))) ret = true;
      });
    }
    console.log("Is Blacklisted?", ret);
    return ret;
  }
  open() {
    this.overlay.classList.remove("is-hidden");
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
    this.options.amounts.forEach((e) => {
      let url = new URL(this.options.donation_link);
      url.searchParams.set("amount", e);
      ret =
        ret +
        `<a class="amount amount_${this.options.currency_position}" target="_blank" href="${url}"><span class="currency">${this.options.currency}</span><span class="amount_value">${e}</span></a>`;
    });
    ret += `<a class="amount other_amount" target="_blank" href="${this.options.donation_link}"><span>${this.options.other_label}</span></a>`;
    return ret;
  }
}
