import crumbs from "./crumbs";
export class AgeCheck {
  constructor(options) {
    this.options = Object.assign(
      {
        age: 18,
        urls: [],
        debug: false
      },
      options
    );
    this.url = window.location.href.split("?")[0];
    if (!this.shouldRun()) return false;
    if (this.isLandingPage()) {
      const AgeGate = crumbs.get("AgeGate"); // Get age cookie
      const underAge =
        AgeGate == null || AgeGate >= this.options.age ? false : true;
      // Get the Page's Point of Insertion
      let content = document.getElementById("app-root").querySelector("h6");
      // Create a new Container
      let container = document.createElement("div");
      // Assign an ID to the Container
      container.id = "ifawAgeGate";
      let markup = "";

      if (underAge) {
        markup = `
        <p id="ageMessage" class="error">
          Sorry! You are not eligible to enter an artist into this year’s contest
        </p>
        `;
      } else {
        markup = `
      <div class="age-container">
          <p id="ageMessage">
            To begin, please enter the guardian's date of birth<br> or the youth's date of birth if 18 years old.
          </p>
          <div id="age-form">
            <div class="age-dd">
              <select id="month"><option value="">Month</option></select>
              <select id="day"><option value="">Day</option></select>
              <select id="year"><option value="">Year</option></select>
            </div>
            <div class="age-button">
              <button id="ageBtn" type="button" disabled="disabled">Enter Contest</button>
            </div>
          </div>
      </div>`;
      }
      // Add the markup to container as content
      container.innerHTML = markup;
      // Replace the H6 with my container
      content.replaceWith(container);
      if (!underAge) {
        // Apply the Event Listeners
        let selectYear = document.getElementById("year");
        let selectMonth = document.getElementById("month");
        let selectDay = document.getElementById("day");
        let ageBtn = document.getElementById("ageBtn");
        this.populateMonth();
        this.populateYear(75);
        selectMonth.addEventListener("change", this.populateDays.bind(this));
        selectMonth.addEventListener("change", this.checkDate.bind(this));
        selectYear.addEventListener("change", this.checkDate.bind(this));
        selectDay.addEventListener("change", this.checkDate.bind(this));
        ageBtn.addEventListener("click", this.redirect.bind(this));
      }
    } else if (this.isLegalPage()) {
      let legalBtn = document.getElementById("legalizeSubmit");
      if (legalBtn) {
        legalBtn.addEventListener("click", event => {
          let legalize = document.getElementById("legalize");
          if (legalize && legalize.checked) {
            document.cookie = `LegalGate=1;path=/;domain=ifaw.org`;
          } else {
            document.cookie = `LegalGate=1;path=/;domain=ifaw.org`;
          }
        });
      }
    }
  }
  populateMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let selectMonth = document.getElementById("month");
    for (var m = 0; m < 12; m++) {
      let monthNum = new Date(2020, m).getMonth();
      let month = monthNames[monthNum];
      var monthElem = document.createElement("option");
      monthElem.value = monthNum;
      monthElem.textContent = month;
      selectMonth.append(monthElem);
    }
  }
  populateYear(amount) {
    let selectYear = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    for (var y = 0; y < amount; y++) {
      var yearElem = document.createElement("option");
      yearElem.value = currentYear;
      yearElem.textContent = currentYear;
      selectYear.append(yearElem);
      currentYear--;
    }
  }
  populateDays() {
    let selectMonth = document.getElementById("month");
    let selectDay = document.getElementById("day");
    let year = 2016;
    let month = parseInt(selectMonth[selectMonth.selectedIndex].value) + 1;
    selectDay.innerHTML = "";
    if (selectMonth[selectMonth.selectedIndex].value == "") {
      let dayElem = document.createElement("option");
      dayElem.value = "";
      dayElem.textContent = "Day";
      selectDay.append(dayElem);
    }

    //get the last day, so the number of days in that month
    let days = new Date(year, month, 0).getDate();

    //lets create the days of that month
    for (var d = 1; d <= days; d++) {
      let dayElem = document.createElement("option");
      dayElem.value = d;
      dayElem.textContent = d;
      selectDay.append(dayElem);
    }
  }
  checkDate() {
    let selectMonth = document.getElementById("month");
    let selectDay = document.getElementById("day");
    let selectYear = document.getElementById("year");
    let month = selectMonth[selectMonth.selectedIndex].value;
    let day = selectDay[selectDay.selectedIndex].value;
    let year = selectYear[selectYear.selectedIndex].value;
    this.debug("Month", month);
    this.debug("Day", day);
    this.debug("Year", year);
    let ageBtn = document.getElementById("ageBtn");
    if (month != "" && day != "" && year != "") {
      ageBtn.removeAttribute("disabled");
      return true;
    } else {
      ageBtn.setAttribute("disabled", "disabled");
      return false;
    }
  }
  getAge() {
    if (this.checkDate()) {
      let selectMonth = document.getElementById("month");
      let selectDay = document.getElementById("day");
      let selectYear = document.getElementById("year");
      let month = selectMonth[selectMonth.selectedIndex].value;
      let day = selectDay[selectDay.selectedIndex].value;
      let year = selectYear[selectYear.selectedIndex].value;
      let now = new Date();
      let birthday = new Date(now.getFullYear(), month, day);
      if (now >= birthday) return now.getFullYear() - year;
      else return now.getFullYear() - year - 1;
    }
    return 0;
  }
  redirect() {
    let age = this.getAge();
    this.debug("Age", age);
    document.cookie = `AgeGate=${age};path=/;domain=ifaw.org`;
    if (age < this.options.age) {
      // Not old enough. Create Error Msg
      let message = document.getElementById("ageMessage");
      message.classList.add("error");
      message.innerHTML =
        "Sorry! You are not eligible to enter an artist into this year’s contest";
      // Delete Form
      document.getElementById("age-form").remove();
    } else {
      // Redirect to Legal Page
      window.location.href = this.options.urls[1];
    }
  }

  isLandingPage() {
    const landing = this.options.urls[0];
    return landing == this.url;
  }
  isLegalPage() {
    const legal = this.options.urls[1];
    return legal == this.url;
  }
  shouldRun() {
    if (this.options.debug) {
      this.debug("Current URL", this.url);
      this.debug("Landing Page", this.options.urls[0]);
      this.debug("Legal Page", this.options.urls[1]);
    }
    // Only run the script if the current URL is one of the URLs from Options
    if (this.options.urls.includes(this.url)) {
      const AgeGate = crumbs.get("AgeGate"); // Get age cookie
      const LegalGate = crumbs.get("LegalGate"); // Get legal cookie
      this.debug("Age Cookie", AgeGate);
      this.debug("Legal Cookie", LegalGate);
      if (this.isLandingPage()) {
        // Always run if we're on the Landing Page
        return true;
      } else if (this.isLegalPage()) {
        // If we're on the Legal
        const AgeGate = crumbs.get("AgeGate"); // Get age cookie
        // Redirect to Landing Page if there's no AgeGate cookie
        if (AgeGate < this.options.age) {
          window.location.href = this.options.urls[0];
          return false;
        }
        return true;
      } else {
        // Redirect to Landing Page if there's no AgeGate cookie
        if (AgeGate < this.options.age) {
          window.location.href = this.options.urls[0];
          return false;
        }
        // Redirect to Legal Page if there's no LegalGate cookie
        if (!LegalGate) {
          window.location.href = this.options.urls[1];
          return false;
        }
        return true;
      }
    }
    return false;
  }
  debug(label, text) {
    if (!this.options.debug) {
      return false;
    }
    console.log(label, text);
  }
}
