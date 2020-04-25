const cardModel = require('../models/card');

const findCards = (req, res, next) => {
 return cardModel.find({})
 .then((card) => {
  res.json(card);
})
 .catch((err) => {
  next(err);
});
}

const createCard = (req, res, next) => {
  const { name, link } = req. body;
  const owner = req.user._id;

  const card = cardModel.create({ name, link, owner })
  .then((card) => {
    res.json(card);
  })
  .catch((err) => {
    next(err);
  });
  return card;
}

const getCardMiddeleware = (req, res, next) => {
  return cardModel.findOne({
    _id: req.params.cardId
  })
  .then((card) => {
    if (!card) {
      return next({status: 404, massage: 'Card not found'});
    }
     req.card = card;
     next();
  })
  .catch((err) => {
    next(err);
  });
}
const findCardById = (req, res, next) => {
 res.json(req.card);
 }

const deleteCard = (req, res, next) => {
  return cardModel.remove({_id: req.params.cardId})
  .then(data => res. json(data))
  .catch(next);
}
module.exports = {
  findCards,
  createCard,
  getCardMiddeleware,
  findCardById,
  deleteCard
}