(function () {
  //Add all require events
  function addEvents() {
    //add new user
    $("#person").submit(validateForm);
  }

  function validateForm(e) {
    //Prevent overloading
    e.preventDefault();

    var name = $("#name").val();
    var surname = $("#surname").val();
    var age = $("#age").val();

    var namePattern = /^[a-zA-Z ]+$/;

    //validate name
    if (!(namePattern.test(name))) {
      alert("Not correct name");
      return;
    }

    //validate surname
    if (!(namePattern.test(surname))) {
      alert("Not correct name");
      return;
    }

    //validate age
    if (isNaN(+age)) {
      alert("Not correct age");
      return;
    }

    table.addNewPerson(name, surname, age);
  }

  //class table
  function Table() {
    this._table = null;
    this._users = null;

    this.init();
  }

  Table.prototype.init = function () {
    //Place where will add new person
    this._table = $("#person-table tbody");
    this._users = [];
    this._id = 0;
  }

  Table.prototype.addNewPerson = function (name, surname, age) {
    var newPerson = new User(name, surname, age);

    this._users.push(newPerson);

    this.renderTable(newPerson);
  }

  Table.prototype.getUsers = function () {
    return this._users;
  }

  Table.prototype.renderTable = function (newPerson) {
    var newRow = createRow();
    newRow.attr("data-id", this._id++);
    this._table.append(newRow);

    function createRow() {
      var newRow = $("<tr></tr>");
      newRow.append($("<td></td>").text(newPerson.getName()));
      newRow.append($("<td></td>").text(newPerson.getSurname()));
      newRow.append($("<td></td>").text(newPerson.getAge()));
      //get discount button
      var discountBtn = $("<button></button>").addClass("btn").attr({
        "data-discount": "data-discount",
        "data-toggle": "modal",
        "data-target": "#discountModal"
      }).text("Get discount");
      discountBtn.click(function () {
        var userId = +$(this).closest("[data-id]").attr("data-id");
        var user = table.getUsers()[userId];
        var discounts = getDiscount(user);
        addModal(discounts);
      });

      var bonusBtn = $("<button></button>").addClass("btn").attr({
        "data-bonus": "data-bonus",
        "data-toggle": "modal",
        "data-target": "#discountModal"
      }).text("Get bonus");
      bonusBtn.click(function () {
        var userId = +$(this).closest("[data-id]").attr("data-id");
        var user = table.getUsers()[userId];
        var bonus = getBonus(user);
        console.log(bonus);
        addModal(bonus);
      });
      newRow.append($("<td></td>").append(discountBtn));
      newRow.append($("<td></td>").append(bonusBtn));

      return newRow;

      function addModal(data) {
        var modal = $(".user-info tbody");
        //Clear 
        modal.empty();
        for (var i = 0; i < data.length; i++) {
          modal.append(renderDiscount(data[i].type, data[i].value))
        }
      }

      function renderDiscount(type, value) {
        var row = $("<tr></tr>");
        var name = $("<td></td>").text(type);
        var val = $("<td></td>").text(value);
        row.append(name);
        row.append(val);
        return row;
      }
    }
  }

  var table = new Table;
  addEvents();
})();