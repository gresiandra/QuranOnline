//home display functions
async function getAllsurah() {
	const allSurah = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json`, {mode: 'cors'})	
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.log(err))
	
	hideSecondary();
	
	return addCards(allSurah)
}

function addCards(allSurah){
	const cardContainer = document.querySelector('.container');
	let card = '';

	for (let i = 0; i < allSurah.length; i++) {
		
		card += `<div class="cards">
					<h3 class="name"><a class="nameData" href="#" data-idsurah="${i}">${allSurah[i].name}</a></h3>
					<p class="nameTranslate">${allSurah[i].name_translations.id}</p>
					<p class="surahNumbers">${i+1}</p>
				</div>`;
		cardContainer.innerHTML = card;
	}
}


//display surah functions
async function getSurah(number) {
	console.log(number)
	const surah = await fetch(`https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/${number}.json`, {mode: 'cors'})	
		.then(response => response.json())
		.then(response => response)
		.catch(err => console.log(err))
	
	console.log(surah)

	hideMain()
	appearSecondary()

	displayTitleSurah(surah)

	return displaySurah(surah);
}

function displayTitleSurah(surah) {
	const title = document.querySelector('.title');
	const translateAr = document.querySelector('.translateAr');
	const translateId = document.querySelector('.translateId');

	title.textContent = surah.name_translations.ar;
	translateAr.textContent = `${surah.name}`;
	translateId.textContent = `" ${surah.name_translations.id}"`;
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
		span.textContent = `( ${ayat} )`;
	}
}

function clearElements() {
	const allNew = document.querySelectorAll('.new');
	
	allNew.forEach(element => {
		element.remove()
	});
}

function hideMain(){
	const allMain = document.querySelectorAll('.main');
	
	allMain.forEach(element => {
		element.style.display = "none";
	});
}

function hideSecondary(){
	const allSecondary = document.querySelectorAll('.secondary');
	
	allSecondary.forEach(element => {
		element.style.display = "none";
	});
}

function appearMain(){
	const allSecondary = document.querySelectorAll('.main');
	
	allSecondary.forEach(element => {
		element.style.display = "flex";
	});
}

function appearSecondary(){
	const allSecondary = document.querySelectorAll('.secondary');
	
	allSecondary.forEach(element => {
		element.style.display = "flex";
	});
}

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const body = document.body;

let number = 1;
getAllsurah();

document.addEventListener('click', e => {
	if (e.target.classList.contains('nameData')) {
		let numbers = e.target.dataset.idsurah;
		let id = parseInt(numbers) + 1;
		
		number = id;
		clearElements()
		getSurah(number)
	}
})

next.addEventListener('click', () => {
	if (number < 114) {
		clearElements();
		getSurah(number+1);	
		number += 1;
		console.log(number)
	} else {
		number = 114;	
	}	
})

prev.addEventListener('click', () => {
	if (number > 1) {
		clearElements();
		getSurah(number-1);	
		number -= 1;
		console.log(number)
	} else {
		number = 1;	
	}
})