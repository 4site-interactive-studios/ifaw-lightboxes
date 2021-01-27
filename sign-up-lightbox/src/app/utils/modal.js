import crumbs from "./crumbs";
import axios from "./axios";
export class Modal {
  constructor(options) {
    const footer_form = document.querySelector("footer form");
    const lang = document.documentElement.lang;
    window.dataLayer = window.dataLayer || [];
    this.overlayID = "ifaw-" + Math.random().toString(36).substring(7);
    this.options = {
      cookie_name: "hideSignUpForm",
      heading_top: "",
      heading_bottom: "",
      success_top: "",
      success_bottom: "",
      paragraph: "",
      button_label: "",
      first_name: footer_form
        ? footer_form.querySelector("[name='first_name']").placeholder
        : "",
      last_name: footer_form
        ? footer_form.querySelector("[name='last_name']").placeholder
        : "",
      email: footer_form
        ? footer_form.querySelector("[name='email']").placeholder
        : "",
      blacklist: [],
      whitelist: [],
      dates: [],
      double_opt_in_required: "0",
      source: "lightbox",
      mode: "big", // big, small-single, small-multi
      trigger: 0, // int-seconds, px-scroll location, %-scroll location, exit-mouse leave
      triggered: false,
    };
    this.loadTranslation(lang);
    this.options = Object.assign(this.options, options);
    if (!this.shouldRun()) {
      // If we're not between the running dates, get out
      return false;
    }
    // Create a cookie with value as 0 if script can run
    crumbs.set(this.options.cookie_name, 0, {
      type: "day",
      value: 1,
    });
    const markup = `
    <div class="ifawModal-container">
        <a href="#" class="button-close"></a>
        <div class="content">
          <div class="left">
            <h2 class="title">${this.options.heading_top}</h2>
            <h2 class="success">${this.options.success_top}</h2>

            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="367" height="194" viewBox="0 0 367 194">
                <g fill="#007EFF">
                    <path d="M10 41L36 41 23 3z" transform="translate(-6.29 -11.152) rotate(-58 23 22)"/>
                    <path d="M181.45 209.012L207.45 209.012 194.45 171.012z" transform="translate(-6.29 -11.152) rotate(-141 194.45 190.012)"/>
                    <path d="M20.48 28.772l3.619-8.24 12.052 5.29c95.447 41.853 167.616 72.638 216.33 92.293l2.348.945 2.936-3c23.389-23.82 39.317-37.986 48.007-42.667l.456-.241c16.877-8.694 33.241-7.723 46.116 1.533 11.448 8.232 18.895 22.348 19.934 37.152 1.056 15.045-5.078 27.237-16.415 34.59-10.231 6.637-23.846 8.657-36.62 5.602l-.942-.232c-10.02-2.535-29.105-9.39-57.297-20.58l-3.909-1.557-3.273 3.398c-14.96 15.582-32.579 34.567-52.807 56.918l-2.886 3.193-6.68-6.033 5.36-5.922c19.422-21.425 36.368-39.673 50.879-54.773l.387-.404-5.517-2.233c-48.394-19.656-117.742-49.285-208.192-88.938l-13.887-6.094zm326.61 53.22c-10.086-7.251-22.827-8.007-36.74-.84-7.504 3.866-22.472 17.162-44.693 39.726l-1.772 1.804 5.81 2.3c24.88 9.794 41.838 15.831 50.842 18.098l.799.196c10.447 2.498 21.532.853 29.63-4.399 8.6-5.579 13.16-14.643 12.334-26.41-.857-12.208-7-23.852-16.21-30.474z" transform="translate(-6.29 -11.152)"/>
                </g>
            </svg>
            <h2 class="subtitle">${this.options.heading_bottom}</h2>
            <p class="success">${this.options.success_bottom}</p>
            <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="90" height="46" viewBox="0 0 90 46">
                <g fill="none" fill-rule="evenodd">
                    <path fill="#000" d="M.415 34.9h8.26V10.915H.414V34.9zM4.522 8.622c2.583 0 4.567-1.789 4.567-4.22 0-2.43-1.984-4.264-4.567-4.264C1.938.138 0 1.972 0 4.402c0 2.431 1.938 4.22 4.522 4.22zM13.868 34.9h8.213V16.51h4.89v-5.595h-4.89v-2.11c0-1.559.83-2.613 2.767-2.613.923 0 1.661.137 2.26.32V.505C26.003.23 24.849 0 23.327 0c-5.721 0-9.458 2.844-9.458 8.805v2.11h-3.045v5.595h3.045V34.9zm21.73.55c3.874 0 5.996-1.604 7.15-3.347V34.9h8.027V19.354c0-6.376-4.244-9.082-10.887-9.082-6.598 0-11.165 2.844-11.534 8.623h7.751c.185-1.514 1.014-2.844 3.275-2.844 2.63 0 3.184 1.514 3.184 3.806v.551h-2.307c-8.027 0-12.826 2.202-12.826 7.842 0 5.091 3.83 7.2 8.166 7.2zm2.86-5.549c-1.938 0-2.86-.87-2.86-2.247 0-1.972 1.475-2.614 4.797-2.614h2.169v1.468c0 2.063-1.754 3.393-4.106 3.393zm19.703 5h8.028l3.736-13.392 3.6 13.391h7.888l7.659-23.985h-7.843L77.307 25.27 73.71 10.915h-6.644l-4.06 14.355L59.5 10.915h-8.627l7.29 23.985z"/>
                    <path fill="#007DFA" d="M28.75 45.845L51.139 45.845 51.139 40.25 28.75 40.25z"/>
                </g>
            </svg>
          </div>
          <div class="right">
            <h2 class="small-title">${this.options.heading_top}</h2>
            <h2 class="small-success success">${this.options.success_top}</h2>
            <p class="form-desc">
              ${this.options.paragraph}
            </p>
            <form id="sign-up-form">
              <div class="group">      
                <input type="text" name="first_name" autocomplete="given-name" required>
                <label>${this.options.first_name}</label>
              </div>
              <div class="group">      
                <input type="text" name="last_name" autocomplete="family-name" required>
                <label>${this.options.last_name}</label>
              </div>
              <div class="group">      
                <input type="email" name="email" autocomplete="email" required>
                <label>${this.options.email}</label>
              </div>
              <div class="group">      
                <select name="country" autocomplete="country">
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia, Plurinational State of</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, the Democratic Republic of the</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People's Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthélemy</option>
                  <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela, Bolivarian Republic of</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
              </div>
              <div class="submit">
                <button class="cta" type="button"><span>${this.options.button_label}</span></button>
              </div>
            </form>
            <h2 class="small-subtitle">${this.options.heading_bottom}</h2>
            <p class="small-success success">${this.options.success_bottom}</p>
          </div>
        </div>
    </div>
    `;
    let overlay = document.createElement("div");
    overlay.id = this.overlayID;
    overlay.classList.add("is-hidden");
    overlay.classList.add(lang);
    overlay.classList.add(this.options.mode);
    overlay.classList.add("ifawModal");
    overlay.innerHTML = markup;
    const closeButton = overlay.querySelector(".button-close");
    closeButton.addEventListener("click", this.close.bind(this));
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        closeButton.click();
      }
    });
    // Select the current country
    const country = document.documentElement.lang.split("-");
    const countrySelect = overlay.querySelector("select");
    if (1 in country) {
      countrySelect.value = country[1];
    }
    // Submit the Form
    const formBtn = overlay.querySelector("form button.cta");
    formBtn.addEventListener("click", this.submit.bind(this));

    this.overlay = overlay;
    document.body.appendChild(overlay);
    const triggerType = this.getTriggerType(this.options.trigger);
    console.log("Trigger type: ", triggerType);
    if (triggerType === false) {
      this.options.trigger = 2000;
    }
    if (triggerType === "seconds") {
      this.options.trigger = Number(this.options.trigger) * 1000;
    }
    if (triggerType === "seconds" || triggerType === false) {
      window.setTimeout(this.open.bind(this), this.options.trigger);
    }
    if (triggerType === "exit") {
      document.addEventListener("mouseleave", this.open.bind(this));
    }
    if (triggerType === "pixels") {
      document.addEventListener("scroll", this.scrollTriggerPx.bind(this), true);
    }
    if (triggerType === "percent"){
      document.addEventListener("scroll", this.scrollTriggerPercent.bind(this), true);
    }
  }
  open() {
    window.dataLayer.push({ event: "lightbox_display" });

    this.overlay.classList.remove("is-hidden");
  }
  // Should we run the script?
  shouldRun() {
    console.log(this.options);
    let hideSignUpForm = !!parseInt(crumbs.get(this.options.cookie_name)); // Get cookie
    return (
      !hideSignUpForm &&
      !this.isBlacklisted() &&
      this.isWhitelisted() &&
      this.isBetweenDates()
    );
  }

  close(e) {
    window.dataLayer.push({ event: "lightbox_closed" });
    e.preventDefault();
    crumbs.set(this.options.cookie_name, 1, { type: "day", value: 1 }); // Create one day cookie
    this.overlay.classList.add("is-hidden");
  }

  submit(e) {
    e.preventDefault();
    const button = document.querySelector("#" + this.overlayID + " button");
    const url = "https://api.ifaw.org/api/subscribe";
    let form = document.querySelector("#" + this.overlayID + " form");
    let email = document.querySelector(
      "#" + this.overlayID + " input[name='email']"
    );
    let first_name = document.querySelector(
      "#" + this.overlayID + " input[name='first_name']"
    );
    let last_name = document.querySelector(
      "#" + this.overlayID + " input[name='last_name']"
    );

    console.log(form.classList.contains("open"));

    if (
      this.options.mode == "small-multi" &&
      !form.classList.contains("open")
    ) {
      form.classList.add("open");
      this.overlay.classList.add("mobile-fixed");
      first_name.focus();
      return false;
    }

    // Validate First Name
    if (first_name.value == "") {
      first_name.classList.add("error");
      button.classList.remove("loading");
      return false;
    } else {
      first_name.classList.remove("error");
    }
    // Validate Last Name
    if (last_name.value == "") {
      last_name.classList.add("error");
      button.classList.remove("loading");
      return false;
    } else {
      last_name.classList.remove("error");
    }
    // Validate Email
    if (!this.validateEmail(email.value)) {
      email.classList.add("error");
      button.classList.remove("loading");
      return false;
    } else {
      email.classList.remove("error");
    }

    let formFields = Object.fromEntries(new FormData(form));
    formFields["email-signup"] = true;
    formFields["source"] = this.options.source;
    formFields["double_opt_in_required"] = this.options.double_opt_in_required;
    let data = JSON.stringify(formFields);
    button.classList.add("loading");
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: data,
      url,
    };
    const self = this;
    axios.get("https://api.ifaw.org/api/funnel/signup").then((response) => {
      axios(options)
        .then(function(response) {
          if ("result" in response.data && response.data.result == "success") {
            self.success();
          }
          console.log(response);
        })
        .catch(function(response) {
          //handle error
          button.classList.remove("loading");
          alert("Error while subscribring. Please check your e-mail address.");
          console.log(response);
        });
    });
  }
  success() {
    window.dataLayer.push({ event: "lightbox_submit" });
    let form = document.querySelector("#" + this.overlayID + " form");
    let form_desc = document.querySelector(
      "#" + this.overlayID + " .form-desc"
    );
    let title_small = document.querySelector(
      "#" + this.overlayID + " .small-title"
    );
    let title = document.querySelector("#" + this.overlayID + " .title");
    let subtitle = document.querySelector("#" + this.overlayID + " .subtitle");
    let subtitle_small = document.querySelector(
      "#" + this.overlayID + " .small-subtitle"
    );
    // Hide Title & Subtitle
    title.style.display = "none";
    title_small.style.display = "none";
    subtitle.style.display = "none";
    subtitle_small.style.display = "none";
    // Show Success Messages
    document
      .querySelectorAll(".success")
      .forEach((e) => (e.style.display = "block"));
    // Remove Form
    form.style.display = "none";
    form_desc.style.visibility = "hidden";
    // Create Cookie
    crumbs.set(this.options.cookie_name, 1, { type: "month", value: 12 }); // Create one year cookie
  }
  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
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
  isBetweenDates() {
    var ret = true;
    // Check if the there are dates defined
    if (this.options.dates.length) {
      let now = new Date();
      let start = new Date(this.options.dates[0]);
      let end = new Date(this.options.dates[1] + " 23:59:59");
      if (now < start || now > end) {
        ret = false;
      }
    }
    console.log("Is betwen Dates?", ret);
    return ret;
  }
  loadTranslation(lang) {
    switch (lang) {
      // United Kingdom
      case "en-GB":
        this.options.heading_top = "stay in the know";
        this.options.heading_bottom = "be ready to <strong>act</strong>";
        this.options.success_top = "you’re signed up.";
        this.options.success_bottom =
          "Keep an eye on your inbox to learn more about ways you can create a better world for animals and people.";
        this.options.paragraph =
          "Stay up to date on the animals and issues you care about most. You’ll receive news, updates on activities and on future giving opportunities. You can unsubscribe at any time.";
        this.options.button_label = "Subscribe";
        break;
      // Netherlands
      case "nl-NL":
        this.options.heading_top = "Blijf alert";
        this.options.heading_bottom = "Klaar voor <strong>actie</strong>";
        this.options.success_top = "je bent ingeschreven.";
        this.options.success_bottom =
          "Houd je mailbox in de gaten. Binnenkort meer informatie over hoe jij kunt bijdragen aan een betere wereld voor dieren en mensen.";
        this.options.paragraph =
          "Ja, ik blijf graag betrokken bij het welzijn van de dieren. Op elk gewenst moment kun jij je uitschrijven.";
        this.options.button_label = "Inschrijven";
        break;
      // France
      case "fr-FR":
        this.options.heading_top = "restez informé(e)";
        this.options.heading_bottom =
          "pour être prêt(e) à <strong>agir</strong>";
        this.options.success_top = "Vous êtes inscrit(e)";
        this.options.success_bottom =
          "Gardez un œil sur votre messagerie pour en savoir plus sur les différentes façons d’aider dans la création d’un monde meilleur pour les animaux et les hommes.";
        this.options.paragraph =
          "Restez informé(e) sur les animaux. Vous recevrez des messages à propos de nos activités et des futurs moyens de nous aider. Vous pourrez vous désinscrire à tout moment.";
        this.options.button_label = "S’inscrire";
        break;
      // Germany
      case "de-DE":
        this.options.heading_top = "Bleiben Sie auf dem Laufenden";
        this.options.heading_bottom =
          "Erfahren Sie, wann wir Ihre <strong>Hilfe brauchen.</strong>";
        this.options.success_top = "Sie sind angemeldet";
        this.options.success_bottom =
          "Halten Sie die Augen nach E-Mails von uns auf. Gemeinsam schaffen wir eine bessere Welt für Tiere und Menschen.";
        this.options.paragraph =
          "Ja, ich möchte News, Updates zu laufenden Aktivitäten sowie zu zukünftigen Spendenmöglichkeiten erhalten. Ich weiß, dass ich mich jederzeit wieder abmelden kann.";
        this.options.button_label = "hier anmelden";
        break;
      // Canada
      case "en-CA":
        this.options.heading_top = "stay in the know";
        this.options.heading_bottom = "be ready to <strong>act</strong>";
        this.options.success_top = "you’re signed up.";
        this.options.success_bottom =
          "Keep an eye on your inbox to learn more about ways you can create a better world for animals and people.";
        this.options.paragraph =
          "stay up to date on the animals and issues you care about the most. You can unsubscribe at any time";
        this.options.button_label = "Subscribe";
        break;
      // Australia
      case "en-AU":
        this.options.heading_top = "stay in the know";
        this.options.heading_bottom = "be ready to <strong>act</strong>";
        this.options.success_top = "you’re signed up.";
        this.options.success_bottom =
          "Keep an eye on your inbox to learn more about ways you can create a better world for animals and people.";
        this.options.paragraph =
          "Stay up to date on the animals and issues you care about most. You’ll receive news, updates on activities and on future giving opportunities. You can unsubscribe at any time.";
        this.options.button_label = "Subscribe";
        break;
      // Africa
      case "en-ZA":
      // International, Europe or EUA
      case "en":
      default:
        this.options.heading_top = "stay in the know";
        this.options.heading_bottom = "be ready to <strong>act</strong>";
        this.options.success_top = "you’re signed up.";
        this.options.success_bottom =
          "Keep an eye on your inbox to learn more about ways you can create a better world for animals and people.";
        this.options.paragraph =
          "stay up to date on the animals and issues you care about the most. You can unsubscribe at any time";
        this.options.button_label = "Subscribe";
    }
  }
  getTriggerType(trigger) {
    /**
     * Any integer (e.g., 5) -> Number of seconds to wait before triggering the lightbox
     * Any pixel (e.g.: 100px) -> Number of pixels to scroll before trigger the lightbox
     * Any percentage (e.g., 30%) -> Percentage of the height of the page to scroll before triggering the lightbox
     * The word exit -> Triggers the lightbox when the mouse leaves the DOM area (exit intent).
     * With 0 as default, the lightbox will trigger as soon as the page finishes loading.
     */
    console.log("Trigger Value: ", trigger);

    if (!isNaN(trigger)) {
      return "seconds";
    } else if (trigger.includes("px")) {
      return "pixels";
    } else if (trigger.includes("%")) {
      return "percent";
    } else if (trigger.includes("exit")) {
      return "exit";
    } else {
      return false;
    }
  }
  scrollTriggerPx(e) {
    const triggerValue = Number(this.options.trigger.replace("px", ""));
    if (window.scrollY >= triggerValue && !this.options.triggered) {
      this.open();
      this.options.triggered = true;
    }
  }
  scrollTriggerPercent(e) {
    const triggerValue = Number(this.options.trigger.replace("%", ""));
    const target = (triggerValue / 100) * document.documentElement.clientHeight;
    if (window.scrollY >= target && !this.options.triggered) {
      this.open();
      this.options.triggered = true;
    }
  }
}
