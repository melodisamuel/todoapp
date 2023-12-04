//  Toggle light and dark mode
const icon = document.getElementById("icon");

icon.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    icon.src = "./images/icon-moon.svg";
    icon.style.transition = "all 0.3s ease-in-out";
  } else {
    icon.src = "./images/icon-sun.svg";
    icon.style.transition = "all 0.3s ease-in-out";
  }
};



// TODO CONTROLLER
const todoController = (function () {
  const Todo = function (id, todo) {
    this.todo = todo;
    this.id = id;
  };

  const data = {
    allItems: {
      todo: [],
    },
    totals: {
      todo: 0,
    },
  };

  return {
    addItem: function (todo) {
      let newItem, ID;

      newItem = new Todo(ID, todo);
      ID = data.totals.todo;

      // increament the total count
      data.totals.todo++;

      // push into data Structure
      data.allItems.todo.push(newItem);

      //return the new element
      return newItem;
    },
  };
})();

// UI CONTROLLER
const UIController = (function () {
  const DOMstrings = {
    dataClass: "new-class",
    dataCheckButton: ".check-button",
    boxesContainer: ".Boxes",
    cancel: ".cancel",
    sectionList: ".section-list",
  };

  let chceckIdCounter = 0;

  return {
    getData: function () {
      return {
        class: document.querySelector(".new-class").value,
      };
    },

    addListItem: function (obj) {
      let checkboxId = `checkbox-${chceckIdCounter}`;
      chceckIdCounter++;

      const html = `<div class="box"><input class="check-button" type="checkbox" id="${checkboxId}">
      <label for="${checkboxId}">
        <img src="./images/icon-check.svg" alt="">
      </label>
      <h2>${obj.todo}</h2>
      <div class="cancel">
        <img src="./images/icon-cross.svg" alt="">
      </div>
      <div class="vl"></div>
    `;
      // create HTML string with placeholder text
      // "${obj.id}

      // replace the placeholder test with some actual data
      newHtml = html.replace("todo", this.todo);

      // insert the HTML into the DOM 
      document
        .querySelector(DOMstrings.boxesContainer)
        .insertAdjacentHTML("beforeend", html);
    },

    clearFields: function () {
      document.querySelectorAll(DOMstrings.dataClass).value = "";
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// GLOBAL APP CONTROLLER
const controller = (function (todoCtrl, UICtrl) {
  const setupEventlisteners = function () {
    const DOM = UICtrl.getDOMstrings();

    document
      .querySelector(DOM.dataCheckButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
      {
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(DOM.cancel)) {
        ctrlDeleteItem(event);
      }
    });

    document
      .querySelector(DOM.boxesContainer)
      .addEventListener("change", function (event) {
        if (event.target.classList.contains("check-button")) {
          ctrlToggleItem(event);
        }
      });
    document
      .querySelector(`${DOM.sectionList} .text-4`)
      .addEventListener("click", ctrlClearCompleted);
    document
      .querySelector(`${DOM.sectionList} .text-1`)
      .addEventListener("click", function () {
        ctrlFilterTodos("All");
          
        changeFilterTextColors();
        this.style.color = "hsl(222.12deg 77.44% 38.24%";
      });
    document
      .querySelector(`${DOM.sectionList} .text-2`)
      .addEventListener("click", function () {
        ctrlFilterTodos("Active");
        changeFilterTextColors();
        this.style.color = "hsl(222.12deg 77.44% 38.24%";
      });
    document
      .querySelector(`${DOM.sectionList} .text-3`)
      .addEventListener("click", function () {
        ctrlFilterTodos("Completed");
        changeFilterTextColors();
        this.style.color = "hsl(222.12deg 77.44% 38.24%";
      });
  };

  let itemsLeftCount = 0; // Initial items left count

  const updateItemCount = function () {
    const itemCount = document.querySelector(".text-0");
    itemCount.textContent = `${itemsLeftCount} ${
      itemsLeftCount === 1 ? "item" : "items"
    } left`;
  };

  const ctrlAddItem = function () {
    // 1. Get the field data
    const data = UICtrl.getData();

    // 2. Add the item to the Todo controller
    const newItem = todoCtrl.addItem(data.class);
    document.querySelector(".new-class").value = ""; 

    //3.  clearing the input fields
    UICtrl.clearFields();

    //4.  Add the item to the UI
    UICtrl.addListItem(newItem);

    //5. update the itemCount
    itemsLeftCount++;
    updateItemCount();
  };
  const ctrlDeleteItem = function (event) {
    const item = event.target.closest(".box");
    if (item) {
      item.remove();
      itemsLeftCount--;
      updateItemCount();
    }
  };
  const ctrlToggleItem = function (event) {
    const checkbox = event.target;
    const item = checkbox.closest(".box");
    if (item) {
      item.classList.toggle("completed");
      itemsLeftCount =
        itemsLeftCount + (item.classList.contains("completed") ? -1 : 1);
    }
  };

  const ctrlFilterTodos = function (filterType) {
    const todos = document.querySelectorAll(".box");

    todos.forEach((todo) => {
      if (
        filterType === "All" ||
        (filterType === "Active" && !todo.classList.contains("completed")) ||
        (filterType === "Completed" && todo.classList.contains("completed"))
      ) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  };
  const ctrlClearCompleted = function () {
    const todo = document.querySelectorAll(".box.completed");

    todo.forEach((todo) => {
      todo.remove();
    });
    itemsLeftCount = document.querySelectorAll(".box:not(.completed)").length;
    updateItemCount();
  };

  const changeFilterTextColors = function () {
    const filterOptions = document.querySelector(
      ".text-1"
    ) 
  }

  // const sortable = new sortable(boxes, {
  //   animation: 150
    
  // })

  return {
    init: function () {
      console.log("Application is working");
      setupEventlisteners();
    },
  };
})(todoController, UIController);

controller.init();
