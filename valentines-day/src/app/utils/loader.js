export class Loader {
  static css(url) {
    return new Promise((resolve, reject) => {
      this._load("link", url, resolve, reject);
    });
  }

  static js(url) {
    return new Promise((resolve, reject) => {
      this._load("script", url, resolve, reject);
    });
  }

  static _load(tag, url, resolve, reject) {
    let element = document.createElement(tag);
    let attr;
    let parent;

    // resolve and reject for the promise
    element.addEventListener("load", () => {
      resolve(url);
    });
    element.addEventListener("error", () => {
      reject(url);
    });

    // set different attributes depending on tag type
    switch (tag) {
      case "script":
        parent = "body";
        attr = "src";
        element.async = false;
        break;
      case "link":
        parent = "head";
        attr = "href";
        element.type = "text/css";
        element.rel = "stylesheet";
        break;
      default:
        throw new Error("Unsupported tag.");
    }

    // set the url for the element
    element[attr] = url;

    // initiate the loading of the element
    document[parent].appendChild(element);
  }
}
