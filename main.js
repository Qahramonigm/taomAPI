const btnSearch = document.querySelector('.header__search');
btnSearch.addEventListener('click', () => {
  btnSearch.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.anim-item');
  const showOnScroll = () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('show');
      }
    });
  };
  showOnScroll();
  window.addEventListener('scroll', showOnScroll);
});

const sectionCard = document.getElementById('sectionCard');
const favoritesList = document.getElementById('favorites-list');
const favBtn = document.querySelector('.header__button-sevimlilar');
const searchInput = document.querySelector('.header__search');
const searchBtn = document.querySelector('.header__button');
const sortSelect = document.getElementById('sort');
const bangilaBtn = document.querySelector('.pizza-btn');

fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');

function fetchMeals(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        renderMeals(data.meals.slice(0, 12));
      } else {
        sectionCard.innerHTML = "<p>Ma'lumot topilmadi</p>";
      }
    });
}

function renderMeals(meals) {
  sectionCard.innerHTML = '';
  meals.forEach(meal => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <p>${meal.strCategory || ''}</p>
      <button class="fav-add-btn" data-name="${meal.strMeal}">
        Sevimlilarga qo'shish
      </button>
    `;
    sectionCard.appendChild(card);
  });
  document.querySelectorAll('.fav-add-btn').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      addToFavorites(name);
    });
  });
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Iltimos, biror taom nomini kiriting!');
    return;
  }
  fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
});

const browseContainer = document.getElementById('searchLatter');
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
  const span = document.createElement('span');
  span.textContent = letter;
  span.addEventListener('click', () => {
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  });
  browseContainer.appendChild(span);
});

sortSelect.addEventListener('change', () => {
  const selected = sortSelect.value;
  if (selected === 'All') {
    fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  } else {
    fetchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selected}`);
  }
});

function addToFavorites(name) {
  if (!name) return;
  favBtn.classList.add('active');
  const li = document.createElement('li');
  li.innerHTML = `
    ${name}
    <button class="remove-fav" style="margin-left:10px;">❌</button>
  `;
  favoritesList.appendChild(li);
  li.querySelector('.remove-fav').addEventListener('click', () => {
    li.remove();
  });
}

function toggleNavbar() {
  favBtn.classList.toggle('active');
}

function closeNavbar() {
  favBtn.classList.remove('active');
}

let angle = 0;
bangilaBtn.addEventListener('click', () => {
  angle += 360;
  bangilaBtn.style.transition = 'transform 0.5s';
  bangilaBtn.style.transform = `rotate(${angle}deg)`;
});