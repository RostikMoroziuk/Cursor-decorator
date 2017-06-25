//class
function User(name, surname, age) {
  //user data
  this._name = name;
  this._surname = surname;
  this._age = age;

  //bonus and discount info
  this._lastVisitDate 
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