var Offer = require('../models/offer');

module.exports.getOffers = function(){
  return [
    new Offer('3 for 2 Papayas', function(cartLine) {
      if (cartLine.name === 'Papaya' && cartLine.quantity > 2) {
        return Math.floor(cartLine.quantity / 3.0) * cartLine.unitPrice;
      }
      return 0;
    }),
  ];
};
