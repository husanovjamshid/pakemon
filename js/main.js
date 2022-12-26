var elList = document.querySelector(".js-list");
var elItem = document.querySelector(".js-item");
var elSelect = document.querySelector(".js-select");
var elInput = document.querySelector(".js-input");
var elSort = document.querySelector(".sorts");
var elBookmark = document.querySelector(".bookmark__list");
// var elDeleteBook = document.querySelector(".fa-trash");

var newArr = [];
function pocFunc(pocArray, pocList) {
  pocList.innerHTML = "";
  for (var item of pocArray) {
    item.type.forEach(function (el, index) {
      newArr.push(el);

      var set = new Set(newArr);

      newArr = [];
      for (i of set) {
        newArr.push(i);
      }
    });
    var cards = document.createElement("div");
    cards.setAttribute(
      "class",
      "col-sm-12 col-md-6 col-lg-4  position-relative"
    );
    let bookmarkBtn = document.createElement("i");
    bookmarkBtn.setAttribute("class", "fa-regular fa-bookmark");

    cards.innerHTML = `
      <div class="card text-center border-0 m-auto p-3">
        <img src="${item.img}" class="card-img-top m-auto" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title"><strong>#${item.id}</strong></h5>
          <h5 class="card-title mt-3">${item.name}</h5>
          <p class="card-text">Candy: ${item.candy}</p>
          <div>
          <div class="d-flex justify-content-center"><p class="&quot;card-text">Weight: ${item.weight}</p><p class="&quot;card-text ms-3">Height: ${item.height}</p></div>
          </div>
          <p class="card-text">Spawn time: ${item.spawn_time}</p>
          
        </div>
      </div>
    `;
    bookmarkBtn.dataset.pocId = item.id;
    cards.appendChild(bookmarkBtn);
    pocList.appendChild(cards);
  }
}
pocFunc(pokemons, elList);

for (var types of newArr) {
  var newOption = document.createElement("option");
  newOption.setAttribute("value", `${types}`);
  newOption.textContent = types;

  elSelect.appendChild(newOption);
}

// Favorite list

function pocBookmarkFunc(array, node) {
  node.innerHTML = "";
  array.forEach((item) => {
    let BookItem = document.createElement("li");
    BookItem.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    BookItem.textContent = item.name;
    let bookDeleteBtn = document.createElement("i");
    bookDeleteBtn.setAttribute("class", "fa-solid fa-trash deleteBookmark text-danger");
    bookDeleteBtn.dataset.pokId = item.id

    
    BookItem.appendChild(bookDeleteBtn)
    node.appendChild(BookItem);
    window.localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList))
  });
}

let bookmarkList = JSON.parse(window.localStorage.getItem('bookmarkList')) || [];
elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".fa-bookmark")) {
    let pocId = evt.target.dataset.pocId;
    let pocFind = pokemons.find((item) => item.id == pocId);

    let dates = new Date()
    let obj = {
      id: dates.getSeconds(),
      name: pocFind.name
    }

    bookmarkList.push(obj)
    pocBookmarkFunc(bookmarkList, elBookmark)
   
  }
});

elBookmark.addEventListener('click', (evt) => {
  if(evt.target.matches('.deleteBookmark')) {
    let pocId = evt.target.dataset.pokId;
    let pocFind = bookmarkList.findIndex((item) => item.id == pocId);
    console.log(pocFind);
    bookmarkList.splice(pocFind, 1)
    pocBookmarkFunc(bookmarkList, elBookmark)
  }
})

pocBookmarkFunc(bookmarkList, elBookmark)
// SELECT
var pocTypes = [];
elSelect.addEventListener("change", function () {
  pocTypes = [];

  if (elSelect.value != "All") {
    pokemons.forEach((pokemon) => {
      if (pokemon.type.includes(elSelect.value)) {
        pocTypes.push(pokemon);
      }
    });
    pocFunc(pocTypes, elList);
  } else {
    pocFunc(pokemons, elList);
  }
});

// INPUT
var inArr = [];
elInput.addEventListener("input", () => {
  inArr = [];
  pokemons.forEach((inputItem) => {
    if (inputItem.name.toLowerCase().includes(elInput.value)) {
      inArr.push(inputItem);
    }
  });
  console.log(inArr);
  pocFunc(inArr, elList);
});

// SORT

var sortArr = [];
elSort.addEventListener("change", function () {
  sortArr = [];
  if (elSort.value != "All") {
    pokemons.forEach((item) => {
      if (elSort.value == "a_z") {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            a.name.toLowerCase().charCodeAt(0) -
            b.name.toLowerCase().charCodeAt(0)
        );
      } else {
        sortArr.push(item);
        sortArr.sort(
          (a, b) =>
            b.name.toLowerCase().charCodeAt(0) -
            a.name.toLowerCase().charCodeAt(0)
        );
      }
    });
    pocFunc(sortArr, elList);
  } else {
    pocFunc(pokemons, elList);
  }
});

var elDarkBtn = document.querySelector(".dark__mode");
var elLightBtn = document.querySelector(".light__mode");

let theme = false;

elDarkBtn.addEventListener("click", function () {
  theme = true;

  let bg = "dark";
  window.localStorage.setItem("theme", bg);
  darkFunc();
});

function darkFunc() {
  if (window.localStorage.getItem("theme") == "dark") {
    elDarkBtn.classList.add("mode__active");
    elLightBtn.classList.remove("mode__active");
    document.body.style.backgroundColor = "#333";
  }
}

darkFunc();

elLightBtn.addEventListener("click", function () {
  theme = false;

  let bg = "light";
  window.localStorage.setItem("theme", bg);
  lightFunc();
});

function lightFunc() {
  if (window.localStorage.getItem("theme") == "light") {
    document.body.style.backgroundColor = "rgba(255, 255, 67, 0.863)";
    elDarkBtn.classList.remove("mode__active");
    elLightBtn.classList.add("mode__active");
  }
}

lightFunc();
