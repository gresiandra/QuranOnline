async function getSurah(number) {
	const surah = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${number}.json`)	
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.log(err))

	displayTitleSurah(surah)
	console.log(surah)
	return displaySurah(surah);
}

async function getAllsurah() {
	const allSurah = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json`)	
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.log(err))
	
	return addCards(allSurah)
}

function displayTitleSurah(surah) {
	const title = document.querySelector('.title');
	const translate = document.querySelector('.translate');

	title.textContent = surah.name_translations.ar;
	translate.textContent = `" ${surah.name_translations.id} "`;
}

function displaySurah(surah) {
	for (var i = 0; i < surah.verses.length; i++) {
		const arabic = surah.verses[i].text;
		const ayat = surah.verses[i].number;
		const translation = surah.verses[i].translation_id;

		const div = document.createElement('div')
		const h4 = document.createElement('h4')
		const p = document.createElement('p')
		const span = document.createElement('span')
		const buttons = document.querySelector('.buttons');

		h4.classList.add('arabic')
		p.classList.add('translation')
		div.classList.add('content')

		h4.classList.add('new')
		p.classList.add('new')
		div.classList.add('new')

		document.body.insertBefore(div, buttons)

		div.append(h4)
		h4.textContent = arabic;

		div.append(p)
		p.textContent = translation;

		h4.append(span)
		span.textContent = `(${ayat})`;
	}
}

function clearElements() {
	const allNew = document.querySelectorAll('.new');
	
	allNew.forEach(element => {
		element.remove()
	});
}

function addCards(allSurah){
	const cardContainer = document.querySelector('.container');
	let card = '';

	for (let i = 0; i < allSurah.length; i++) {
		card += `<div class="cards">
					<h3 class="name">${allSurah[i].name}</h3>
					<p class="nameTranslate">${allSurah[i].name_translations.id}</p>
					<p class="surahNumbers">${i+1}</p>
				</div>`;
		cardContainer.innerHTML = card
	}
}

number = 15;
getAllsurah()

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

next.addEventListener('click', () => {
	clearElements();
	getSurah(number+1);
	
	number += 1;
	console.log(number)
})

prev.addEventListener('click', () => {
	clearElements();
	getSurah(number-1);
	
	number -= 1;
	console.log(number)
})

