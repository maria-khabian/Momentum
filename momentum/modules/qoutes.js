import { getRandomNum } from './help.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoter = document.querySelector('.change-quote');

async function getQoutes(rundomNum = getRandomNum(1, 14)) {
    const qoutesData = 'assets/qoutes.json';
    const result = await fetch(qoutesData);
    const data = await result.json();

    quote.textContent = `${data[rundomNum].text}`;
    author.textContent = `${data[rundomNum].author}`;
}

changeQuoter.addEventListener('click', () => getQoutes())

export {getQoutes}