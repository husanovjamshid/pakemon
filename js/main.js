var elList = document.querySelector(".js-list");
var elItem = document.querySelector(".js-item");

for (var item of pokemons) {
  var card = document.createElement("div");
  card.setAttribute("class", "card text-center m-auto cursor p-3 bg border-0 ");

  var idPack = document.createElement("h3");
  idPack.setAttribute("class", "card-title");
  idPack.textContent = `#${item.id}`;

  var namePack = document.createElement("h3");
  namePack.setAttribute("class", "card-title");
  namePack.textContent = item.name;

  var candyPack = document.createElement("p");
  candyPack.setAttribute("class", '"card-text');
  candyPack.textContent = item.candy;

  var cardWH = document.createElement("div");
  cardWH.setAttribute("class", "d-flex justify-content-center");

  var weightPack = document.createElement("p");
  weightPack.setAttribute("class", '"card-text');
  weightPack.textContent = `Weight: ${item.weight}`;

  var heightPack = document.createElement("p");
  heightPack.setAttribute("class", '"card-text ms-3');
  heightPack.textContent = `Height: ${item.height}`;

  var spawn = document.createElement("p");
  spawn.setAttribute("class", '"card-text ');
  spawn.textContent = `Spawn time: ${item.spawn_time}`;

  var img = document.createElement("img");
  img.setAttribute("src", item.img);
  img.setAttribute("class", "w-50 card-img-top m-auto");

  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  var items = document.createElement("div");
  items.setAttribute("class", "col-sm-12 col-md-6 col-lg-4");

  cardWH.appendChild(weightPack);
  cardWH.appendChild(heightPack);
  cardBody.appendChild(idPack);
  cardBody.appendChild(namePack);
  cardBody.appendChild(candyPack);
  cardBody.appendChild(cardWH);
  cardBody.appendChild(spawn);
  card.appendChild(img);
  card.appendChild(cardBody);
  items.appendChild(card);
  elList.appendChild(items);
}
