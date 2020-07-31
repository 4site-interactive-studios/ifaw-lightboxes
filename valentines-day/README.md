# IFAW - Art Around the World Script

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the files and publish it.

## Development

https://www.ifaw.org/take-action/global-youth-art-contest-2020

```
<script>
  console.log("20191227 - Art Around the World")
</script>
<script>
             var AgeOptions =
      {
        age: 18,
        urls: [
        	"https://www.ifaw.org/take-action/global-youth-art-contest-2020", // First One is Always the Landing Page
        	"https://secure.ifaw.org/content/art-around-world-legal-agreement", // Second is Always the Legal Page
        	"https://secure.ifaw.org/art-around-world-contest",
        	"https://ifaw.gospringboard.com/content/thank-you-your-submission"
        	],
        debug: true,
      };
  window.addEventListener("load", function(){
    var script = document.createElement('script');
    script.src = "https://s3.amazonaws.com/ifaw-4site/aaw/main.js";
    document.querySelector('head').appendChild(script);
  });
</script>
```

Chrome Extension: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en
