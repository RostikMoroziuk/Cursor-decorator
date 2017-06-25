//discount decorator
var getDiscount = (function () {
  return function (user) {
    var now = new Date();
    var userDiscount = user.getDiscount();
    console.log("discount", userDiscount);
    //total discount in percent
    var discount = userDiscount.globalDiscount;

    if (isNight(now.getHours())) {
      discount += userDiscount.nightDiscount;
    }

    if (isWeekend(now.getDay())) {
      discount += userDiscount.weekendDiscount;
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
    var MS_IN_HOUR = 360000;

    updateLastVisitDate(user);

    var now = new Date();
    var bonus = user.getBonus();
    //hours since last session
    var hoursSinceLastSession = (now - user.getLastVisitDate()) / MS_IN_HOUR;
    console.log("hours", hoursSinceLastSession);
    //if user was online in last 10 day
    bonus += daysBonus(hoursSinceLastSession);
    //orderCount bonus
    bonus += user.getOrdersCount();

    return bonus;
  }

  function updateLastVisitDate(user) {
    //set current date;
    user._lastVisitDate = new Date();
  }

  function daysBonus(hours) {
    //if user was online in last 10 day
    var BONUS_DATE = 240;
    if (hours < BONUS_DATE) {
      return BONUS_DATE - hours;
    } else {
      return 0;
    }
  }
})();