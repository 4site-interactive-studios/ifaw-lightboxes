# Rescue Vote Script

## Install Dependencies

1. `npm install`

## Deploy

1. `npm run build`

It's going to create a `dist` folder, where you can get the files and publish it.

## Development

https://www.ifaw.org/resources/rescuevote

```
var cards =
{
	title: '<strong>rescue vote</strong> placeholder title and introduction. max char. 64',
	paragraph: 'This is an optional Description',
	items: [
	{
		title: 'triptych card title max char. 54',
		paragraph: 'Placeholder paragraph. Max Char. 234. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Nunc sed id semper risus in.',
		checkbox: 'vote for communities taking the lead',
		image: 'https://picsum.photos/770/1150?one',
		cta_label: 'donate 1',
		cta_link: 'https://google.com',

	},
	{
		title: 'playa del carmen community animals project',
		paragraph: 'This is a small paragraph',
		checkbox: 'Yo bro! Click the thing',
		image: 'https://picsum.photos/770/1150?two',
		cta_label: 'donate 2',
		//cta_link: '',
	},
	{
		title: 'Card Three',
		paragraph: 'Placeholder paragraph. Max Char. 234. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra.',
		checkbox: 'vote for my new card',
		image: 'https://picsum.photos/770/1150?three',
		cta_label: 'donate 3',
		cta_link: 'https://instagram.com',
	},
	{
		title: 'Card Four',
		paragraph: 'Placeholder paragraph. Max Char. 234. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra.',
		checkbox: 'vote for my new card',
		image: 'https://picsum.photos/770/1150?four',
		cta_label: 'donate 4',
		cta_link: 'https://codigofalado.com',
	},
	{
		title: 'Card Five',
		paragraph: 'Placeholder paragraph. Max Char. 234. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra.',
		checkbox: 'vote for my new card',
		image: 'https://picsum.photos/770/1150?five',
		cta_label: 'donate 5',
		cta_link: 'https://codigofalado.com',
	},
	],
	debug: true,
};
window.addEventListener("load", function(){
    var script = document.createElement('script');
	script.src = "https://rescue-vote.test/dist/main.js";
	document.querySelector('head').appendChild(script);
});
```

Chrome Extension: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en
