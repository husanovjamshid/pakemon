var elList = document.querySelector(".js-list");
var elItem = document.querySelector(".js-item");
var elSelect = document.querySelector(".js-select");
var elInput = document.querySelector(".js-input");
var elSort = document.querySelector(".sorts");

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
    cards.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");
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
