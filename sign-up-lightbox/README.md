# IFAW Sign Up Lightbox

Documentation: https://docs.google.com/document/d/1YHERK9Sv_Ga4KGqN1SYWOec-lhD3NR2hW90-t4DRXMA/edit#heading=h.2opx6ool3nug

Video Training: https://vimeo.com/4sitestudios/review/459151321/8f3557a04b

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the files and publish it.

## Develop

1. Install the (User JavaScript and CSS)[https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en] extension.
2. Install the (Allow CORS: Access-Control-Allow-Origin) and enable it [https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en]
3. Run `npm run start`.
4. A webserver will start and watch your changes to the `src` folder. It will compile your changes on the `http://localhost:8080/main.js` file.
5. You need to add the `http://localhost:8080/main.js` file to the donation form using the **User JavaScript and CSS** extension.
