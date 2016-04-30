require('./main.css');

let excludes = [
	'mismith.github.io',
];
fetch('https://api.github.com/users/mismith/repos?type=owner')
	.then(res => res.json())
	.then(json => {
		let main = document.getElementById('app');
		json.forEach(repo => {
			if (repo.fork || ! repo.description || repo.description.indexOf('WIP') >= 0) return;
			if (excludes.indexOf(repo.name) >= 0) return;

			let url = repo.homepage || (repo.has_pages ? `https://${repo.owner.login}.github.io/${repo.name}/` : repo.html_url);
			main.innerHTML += `
<article>
<h1>
<a href="${url}">${repo.name}</a>` + (url !== repo.html_url ? `
<a href="${repo.html_url}" title="Repo"><svg aria-hidden="true" class="octicon octicon-repo" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M4 9h-1v-1h1v1z m0-3h-1v1h1v-1z m0-2h-1v1h1v-1z m0-2h-1v1h1v-1z m8-1v12c0 0.55-0.45 1-1 1H6v2l-1.5-1.5-1.5 1.5V14H1c-0.55 0-1-0.45-1-1V1C0 0.45 0.45 0 1 0h10c0.55 0 1 0.45 1 1z m-1 10H1v2h2v-1h3v1h5V11z m0-10H2v9h9V1z"></path></svg></a>` : ``) + `
</h1>
<div>${repo.description}</div>
</article>`;
		});
	});