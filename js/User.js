//class
function User(name, surname, age) {
  //Discounts
  var DISCOUNTS = {
    //discount in percent
    globalDiscount: 1,
    nightDiscount: 2,
    weekendDiscount: 2
  }
  //user data
  this._name = name;
  this._surname = surname;
  this._age = age;

  //bonus info
  this._lastVisitDate = new Date();
  this._bonus = parseInt(Math.random() * 10);

  //and discount info
  this.getDiscount = function() {
    return DISCOUNTS;
  }

  //orders
  this._ordersCount = parseInt(Math.random() * 10);
  this._ordersTotalPrice = parseInt(Math.random() * 100);

  console.log("user", this);
}

User.prototype.getName = function () {
  return this._name;
}

User.prototype.getSurname = function () {
  return this._surname;
}

User.prototype.getAge = function () {
  return this._age;
}

User.prototype.getLastVisitDate = function () {
  return this._lastVisitDate;
}

User.prototype.getBonus = function () {
  return this._bonus;
}

User.prototype.getOrdersCount = function () {
  return this._ordersCount;
}

User.prototype.getOrdersTotalPrice = function () {
  return this._ordersTotalPrice;
}