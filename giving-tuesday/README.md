# IFAW Giving Tuesday Lightbox

Giving Tuesday lightbox for IFAW Website

## How to use

Add the code below to the page you want to use the Giving Tuesday Lightbox:

```html
<script>
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://ifaw-4site.s3.us-east-1.amazonaws.com/giving-tuesday/dist/main.js";
  script.onload = function() {
    var options = {
      title: "help save baby animals <strong>this #GivingTuesday </strong>",
      paragraph:
        "Make a gift to help IFAW teams rescue and rehabilitate the most vulnerable animals — including baby elephants, koalas, and jaguars!",
      cta_label: "donate now",
      amounts: [50, 100, 250, 500],
      donation_link:
        "https://secure.ifaw.org/united-states/save-wildlife-australia-bushfires?a=b",
      start_date: "11/01/2020",
      end_date: "11/30/2020",
      currency_position: "right",
      background:
        "https://ifaw-4site.s3.us-east-1.amazonaws.com/giving-tuesday/jaguars.jpg",
      background_credit: "Photo © Alejandro Prieto",
      align: "right",
      debug: true, // If true, ignore cookie and always opens the modal
    };
    new GivingTuesday(options);
  };
  document.querySelector("head").appendChild(script);
</script>
```

The var `modal` above is where you put all the options for the Lightbox.

## Options

- **title** - Title of the Splash Screen
- **paragraph** - Content of the Splash Screen
- **amounts** - Array with numbers for the donation amounts
- **currency** - Symbol used next to the donation amounts
- **currency_position** - (left|right) Currency position
- **other_label** - Label for the "Other Amount" field
- **cta_label** - Label for the call-to-action button
- **donation_link** - Link to the Donation Page
- **background** - URL to the background image
- **background_credit** - Credits to the image
- **align** - (left|right) - Container's alignment
- **start_date** - (mm/dd/YYYY) Date to Start the Campaign
- **end_date** - (mm/dd/YYYY) Date to end the Campaign
- **whitelist** - Valid regex that does not use "(" or ")". If none are specified, then all pages are considered whitelisted.
- **blacklist** - Valid regex that does not use "(" or ")". If none are specified, then no pages are considered blacklisted.
- **cookie_ttl** - Hours (number) to wait until showing the popup again

## Development

Your js code must be on the `src/app` folder. Styling changes must be on `src/scss`.

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the `main.js` file and publish it.

Currently it's published on:  
https://ifaw-4site.s3.us-east-1.amazonaws.com/giving-tuesday/dist/main.js
