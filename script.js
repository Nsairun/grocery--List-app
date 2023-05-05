const form = document.querySelector("#form");
const addButton = document.querySelector("#btn");
const list = document.querySelector(".shopItems");

let grocery = [
  { name: "apple", value: 100 },
  { name: "orange", value: 300 },
];

let editObject = {};

const editItem = (id) => {
  const spanTag = document.getElementsByName(id)[0];
  const spantext = spanTag.innerHTML.split("-");
  document.getElementById("name").value = spantext[0];
  document.getElementById("value").value = spantext[1];

  editObject = { name: spantext[0], value: spantext[1], domEl: spanTag };
};

const deleteItem = (id) => {
  const domElement = document.getElementById(id);
  grocery = grocery.filter((item, ind) => ind !== id);
  domElement.remove();
};

const diplayItems = () => {
  list.innerHTML = "";
  grocery.forEach((item, ind) => {
    const container = document.createElement("div");
    container.classList.add("container");
    container.id = ind;

    container.innerHTML = `
          <span class="list" name="${ind}">${item.name} - ${item.value}</span>
          <span class="edit">
            <button onclick="editItem(${ind})">Edit</button>
            <button class = "red" onclick="deleteItem(${ind})">Delete</button>
          </span>
        `;
    list.appendChild(container);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { target } = e;

  let item = target.name;
  let itemValue = target.value;
  if (!item.value || !itemValue.value) {
    item.style.border = "1px solid red";
    itemValue.style.border = "1px solid red";
    return;
  }

  if (editObject.name) {
    const updates = `${item.value} - ${itemValue.value}`;
    editObject.domEl.innerHTML = updates;
    editObject = {};

    item.value = "";
    itemValue.value = "";
    return;
  }

  item.style.border = "unset";
  itemValue.style.border = "unset";

  newItem = { name: item.value, value: itemValue.value };
  grocery.push(newItem);

  diplayItems();
  item.value = "";
  itemValue.value = "";
});
