//discount decorator
var getDiscount = (function () {
  return function (user) {
    var now = new Date();
    var userDiscount = user.getDiscount();
    
    var modal = $(".user-discount tbody");
    //Clear 
    modal.empty();

    //total discount in percent
    var discount = userDiscount.globalDiscount;
    modal.append(renderDiscount("Global Discount", userDiscount.globalDiscount + "%"));

    if (isNight(now.getHours())) {
      discount += userDiscount.nightDiscount;
      modal.append(renderDiscount("Night Discount", userDiscount.nightDiscount + "%"));
    }

    if (isWeekend(now.getDay())) {
      discount += userDiscount.weekendDiscount;
      modal.append(renderDiscount("Weekend Discount", userDiscount.weekendDiscount + "%"));
    }

    //Total price
    modal.append(renderDiscount("Total Price", user.getOrdersTotalPrice() + "$"));

    //Total discount
    var totalDiscount = calcTotalDiscount(discount, user.getOrdersTotalPrice() );
    modal.append(renderDiscount("Total Discount", totalDiscount + "$"));

    return totalDiscount;
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

  function renderDiscount(type, value) {
    var row = $("<tr></tr>");
    var name = $("<td></td>").text(type);
    var val= $("<td></td>").text(value);
    row.append(name);
    row.append(val);
    return row;
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