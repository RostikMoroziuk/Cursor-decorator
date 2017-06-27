//discount decorator
var getDiscount = (function () {
  return function (user) {
    var now = new Date();
    var userDiscount = user.getDiscount();
    var allDiscounts = [];

    //total discount in percent
    var discount = userDiscount.globalDiscount;
    allDiscounts.push({
      type: "Global Discount",
      value: userDiscount.globalDiscount + "%"
    })

    if (isNight(now.getHours())) {
      discount += userDiscount.nightDiscount;
      allDiscounts.push({
        type: "Night Discount",
        value: userDiscount.nightDiscount + "%"
      })
    }

    if (isWeekend(now.getDay())) {
      discount += userDiscount.weekendDiscount;
      allDiscounts.push({
        type: "Weekend Discount",
        value: userDiscount.weekendDiscount + "%"
      })
    }

    //Total price
    allDiscounts.push({
      type: "Total Price",
      value: user.getOrdersTotalPrice() + "$"
    })

    //Total discount
    var totalDiscount = calcTotalDiscount(discount, user.getOrdersTotalPrice());
    allDiscounts.push({
      type: "Total Discount",
      value: totalDiscount + "$"
    })

    return allDiscounts;
  }

  function isNight(hour) {
    //[23-5]
    return (hour >= 23 || hour <= 5) ? true : false;
  }

  function isWeekend(day) {
    var SATURDAY = 6;
    var SUNDAY = 0;
    // 6th and 0th
    return day == SUNDAY || day == SATURDAY;
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
    var allBonuses = [];

    updateLastVisitDate(user);

    var now = new Date();
    var bonus = user.getBonus();
    allBonuses.push({
      type: "User Bonuses",
      value: bonus
    });
    //hours since last session
    var hoursSinceLastSession = (now - user.getLastVisitDate()) / MS_IN_HOUR;
    //if user was online in last 10 day
    var daily = daysBonus(hoursSinceLastSession);
    bonus += daily;
    allBonuses.push({
      type: "Daily Bonus",
      value: daily
    });
    //orderCount bonus
    bonus += user.getOrdersCount();
    allBonuses.push({
      type: "Orders Count Bonus",
      value: user.getOrdersCount()
    });

    allBonuses.push({
      type: "Total Bonus",
      value: bonus
    });

    return allBonuses;
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