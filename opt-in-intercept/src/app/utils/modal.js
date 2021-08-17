export class Modal {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        checkboxes: [],
        title: "",
        paragraph: "",
        skip_label: "Skip",
        confirm_label: "Yes",
        footer: "",
        blacklist: [],
        whitelist: [],
        debug: false,
      },
      options
    );
    this.submitButton = document.querySelector(".en__submit button");
    if (!this.shouldRun()) {
      // If we can't find the element, get out
      return false;
    }
    const markup = `
    <div class="ifawSplash-container">
        <div class="container">
          <h1 class="title"><span>${this.options.title}</span></h1>
          <p>${this.options.paragraph}</p>
          <div class="buttons">
            <a class="skip" href="#">${this.options.skip_label}</a>
            <a class="cta" href="#">${this.options.confirm_label}</a>
          </div>
          
          <footer>
            <p>${this.options.footer}</p>
          </footer>
        </div>
    </div>`;
    let overlay = document.createElement("div");
    overlay.id = "ifawSplash";
    overlay.classList.add("is-hidden");
    overlay.innerHTML = markup;
    const skipButton = overlay.querySelector(".skip");
    const yesButton = overlay.querySelector(".cta");
    skipButton.addEventListener("click", this.close.bind(this));
    yesButton.addEventListener("click", this.accept.bind(this));
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.submitButton.click();
      }
    });
    this.overlay = overlay;
    document.body.appendChild(overlay);
    window.enOnSubmit = this.beforeSubmit.bind(this);
  }
  shouldRun() {
    if (this.options.debug) console.log(this.options.checkboxes);

    // Check if we find elements on the page on the page
    if (this.options.checkboxes && this.options.checkboxes.length) {
      var found = false;
      this.options.checkboxes.forEach((element) => {
        let checkbox = document.getElementsByName(element);
        if (!found && checkbox.length) found = true;
      });
      if (this.options.debug) console.log("Intercept Pop up", found);
      return found && !this.isBlacklisted() && this.isWhitelisted();
    }
    return false;
  }
  open() {
    this.overlay.classList.remove("is-hidden");
  }
  check() {
    this.options.checkboxes.forEach((element) => {
      let checkbox = document.getElementsByName(element);
      if (checkbox.length) checkbox[0].checked = true;
    });
  }
  allChecked() {
    var checked = true;
    // If ANY checkbox is unchecked, checked will be false.
    this.options.checkboxes.forEach((element) => {
      let checkbox = document.getElementsByName(element);
      if (checkbox.length && !checkbox[0].checked) checked = false;
    });
    return checked;
  }
  accept(e) {
    e.preventDefault();
    this.check();
    this.submitButton.click();
  }
  beforeSubmit() {
    if (this.options.debug) console.log("Opt-In Intercept Triggered");
    if (!this.allChecked() && this.overlay.classList.contains("is-hidden")) {
      this.open();
      return false; // return false to prevent submit
    }
    return true; // return false to prevent submit
  }
  close(e) {
    e.preventDefault();
    this.submitButton.click();
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
      var url = window.location.pathname + window.location.search;
      this.options.blacklist.forEach((test) => {
        console.log("Checking Blacklist", test);
        if (url.match(new RegExp(test))) ret = true;
      });
    }
    console.log("Is Blacklisted?", ret);
    return ret;
  }
}
