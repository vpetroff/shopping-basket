module.exports.calculate = function (lines, offers) {
  var totalDiscount = 0;

  lines.map(function(line){
    var lineDiscount = 0;
    offers.map(function(offer){
      lineDiscount += offer.apply(line);
    });

    totalDiscount += lineDiscount;
  });

  return totalDiscount;
};
