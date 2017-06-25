(function () {
  //Add all require events
  function addEvents() {
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
    if(isNaN(+age)) {
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

  Table.prototype.getUsers = function() {
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
      newRow.append($("<td></td>"));
      newRow.append($("<td></td>"));

      return newRow;
    }
  }

  var table = new Table;
  addEvents();
})();