/*
	Single-page-app router for the Telephasic template.
	Swaps #hero-slot / #main-slot content based on location.hash instead
	of doing full page loads. Unknown/placeholder hashes (eg. the demo
	nav's "#" links) are ignored so they keep their original inert behavior.
*/
(function () {

	var routes = {
		'#/': {
			title: 'Telephasic by HTML5 UP',
			bodyClass: 'homepage',
			hero: 'tpl-hero-home',
			main: 'tpl-main-home'
		},
		'#/left-sidebar': {
			title: 'Left Sidebar &mdash; Telephasic by HTML5 UP',
			bodyClass: 'left-sidebar',
			hero: null,
			main: 'tpl-main-left-sidebar'
		},
		'#/right-sidebar': {
			title: 'Right Sidebar &mdash; Telephasic by HTML5 UP',
			bodyClass: 'right-sidebar',
			hero: null,
			main: 'tpl-main-right-sidebar'
		},
		'#/no-sidebar': {
			title: 'No Sidebar &mdash; Telephasic by HTML5 UP',
			bodyClass: 'no-sidebar',
			hero: null,
			main: 'tpl-main-no-sidebar'
		}
	};

	var bodyClasses = ['homepage', 'left-sidebar', 'right-sidebar', 'no-sidebar'];

	function render(hash) {
		var route = routes[hash];
		if (!route) return;

		document.title = route.title.replace('&mdash;', '—');

		bodyClasses.forEach(function (c) { document.body.classList.remove(c); });
		document.body.classList.add(route.bodyClass);

		var heroSlot = document.getElementById('hero-slot');
		heroSlot.innerHTML = '';
		if (route.hero) {
			heroSlot.appendChild(document.getElementById(route.hero).content.cloneNode(true));
		}

		var mainSlot = document.getElementById('main-slot');
		mainSlot.innerHTML = '';
		mainSlot.appendChild(document.getElementById(route.main).content.cloneNode(true));

		window.scrollTo(0, 0);

		if (window.pendo && typeof pendo.pageLoad === 'function') {
			pendo.pageLoad();
		}
	}

	window.addEventListener('hashchange', function () {
		render(window.location.hash);
	});

	render(window.location.hash || '#/');

})();
