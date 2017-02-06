module.exports.calculate = function (lines, discount) {
  var total = 0;

  lines.map(function(line){
     total += line.price;
  });

  total -= discount;

  if (total < 0)
    total = 0;

  return total;
};
