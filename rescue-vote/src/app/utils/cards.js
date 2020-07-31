export class Cards {
  constructor(options) {
    this.options = Object.assign(
      {},
      {
        title: "",
        paragraph: "",
        items: [],
        debug: false
      },
      options
    );
    if (!this.shouldRun()) {
      // If we're not between the running dates, get out
      return false;
    }

    let items = "";
    this.options.items.forEach(card => {
      card = Object.assign(
        {
          title: "",
          paragraph: "",
          checkbox: "",
          image: "",
          cta_link: "",
          cta_label: ""
        },
        card
      );

      items += `
      <div class="card ${!card.cta_link ? "disabled" : ""} ${
        !card.paragraph ? "no-hover" : ""
      }" style="background-image: url('${card.image}');">
        <a class="card-link" href="#" data-link="${card.cta_link}">
          <h2 class="card-title"><span>${card.title}</span></h2>
          <p class="card-description">${card.paragraph}</p>
          <div class="card-checkbox">
            ${card.checkbox}
          </div>
          <span class="cta" >${card.cta_label}</span>
          
        </a>
      </div>
      `;
    });

    const markup = `
    <div class="cards-container">
        <div class="container">
          <h1 class="title">${this.options.title}</h1>
          <p class="description">${this.options.paragraph}</p>
          <div class="cards">
            ${items}
          </div>
        </div>
    </div>`;
    // We need that timeout to FIGHT the CMS
    //window.setTimeout(this.writeCards.bind(this, markup), 1000);
    this.writeCards(markup);
  }
  shouldRun() {
    if (this.options.debug) {
      console.log("Options", this.options);
    }
    return this.options.items.length > 0;
  }
  writeCards(markup) {
    // Get the Page's H1
    let title = document.getElementById("app-root").querySelector("h1");

    // Create a new Container
    let container = document.createElement("div");
    // Assign an ID to the Container
    container.id = "ifawCards";
    // Add the markup as content
    container.innerHTML = markup;
    // Get the next element after the H1 (a DIV) and append everything to it
    title.nextSibling.append(container);

    // Create an event to get user's click on the cards
    let cardLinks = document.querySelectorAll(".card-link");
    Array.from(cardLinks).forEach(link => {
      link.addEventListener("click", event => {
        if (!link.parentElement.classList.contains("disabled")) {
          // Disable all other links
          Array.from(cardLinks).forEach(otherLink => {
            if (otherLink !== link) {
              otherLink.parentElement.classList.add("disabled");
              otherLink.classList.add("disabled");
            }
          });
          // If the parent is a no-hover, redirect right away
          if (link.parentElement.classList.contains("no-hover")) {
            let href = link.dataset.link;
            window.location.href = href;
          } else {
            // Run an awesome animation
            link.classList.toggle("animate");
            window.setTimeout(() => link.classList.add("animated"), 1000);
            // Redirect user to data-link attribute
            if ("link" in link.dataset && link.dataset.link) {
              let href = link.dataset.link;
              window.setTimeout(() => (window.location.href = href), 1500);
            }
          }
        }
        event.preventDefault();
      });
    });
  }
}
