
let form = document.querySelector(".grocery-form");
let input = document.querySelector("#grocery");
let list = document.querySelector(".grocery-list");
let clearBtn = document.querySelector(".clear-btn");
let submitBtn = document.querySelector(".submit-btn");
let alert = document.querySelector(".alert");

clearBtn.style.display = "none";

let edit = false;
let editItem = null;


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value.trim();

  if (!value) {
    alert.innerText = "Enter Valid input";
    alert.classList.add("alert-danger");


  setTimeout(() => {
    alert.innerText = "";
    alert.classList.remove("alert-danger");
  }, 2000);
    return;
  }

  if (edit) {

    editItem.querySelector(".title").innerText = value;
    showAlert("Edited successfully", "alert-success");
    submitBtn.innerText = "Submit";
    edit = false;
    editItem = null;
  } else {
   
    let div = document.createElement("div");
    div.classList.add("grocery-item");

    div.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    `;

    list.appendChild(div);
    showAlert("Added successfully", "alert-success");
    clearBtn.style.display = "grid";
  }

  input.value = "";
});


list.addEventListener("click", (e) => {
  let item = e.target.closest(".grocery-item");

  if (!item) return;

  if (e.target.closest(".delete-btn")) {
    item.remove();
    showAlert("Item removed", "alert-danger");
    if (list.children.length === 0) clearBtn.style.display = "none";
  }


  if (e.target.closest(".edit-btn")) {
    input.value = item.querySelector(".title").innerText;
    edit = true;
    editItem = item;
    submitBtn.innerText = "Edit";
  }
});


clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  clearBtn.style.display = "none";
  showAlert("List cleared", "alert-danger");
});


function showAlert(msg, className) {
  alert.innerText = msg;
  alert.classList.add(className);

  setTimeout(() => {
    alert.innerText = "";
    alert.classList.remove(className);
  }, 2000);
}
