//discount decorator
var getDiscount = (function () {
  return function (user) {
    var now = new Date();
    var userDiscount = user.getDiscount();
    console.log("discount", userDiscount);
    //total discount in percent
    var discount = userDiscount.globalDiscount; 
    
    if(isNight(now.getHours())) {
      totalDiscount += userDiscount.nightDiscount;
    }

    if(isWeekend(now.getDay())) {
      totalDiscount += userDiscount.weekendDiscount;
    }

    return calcTotalDiscount();
  }

  function isNight(hour) {
    //[23-5]
    return (hour >= 23 || hour <= 5) ? true : false;
  }

  function isWeekend(day) {
    // 5th and 6th
    return day >= 5;
  }

  //calculate total discount in money
  function calcTotalDiscount(percentDiscount, totalPrice) {
    return (totalPrice * percentDiscount / 100).toFixed(2);
  }
})();

//bonus decorator
var getBonus = (function () {

  return function (user) {
    var now = new Date();
  }

})();