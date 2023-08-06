import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const h = matchMedia("(prefers-contrast: more)");

function checks () {
	let ht;
	
	if ( h.matches ) {
		ht = 'high-contrast';
	}
	else {
		ht = ''
	}

  document.getElementsByTagName('body')[0].setAttribute("class", ht);
	
}

checks();

h.addListener(checks);