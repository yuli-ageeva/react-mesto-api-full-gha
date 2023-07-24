const { Card } = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const ForbiddenError = require('../errors/ForbiddenError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передано некорректное id карточки'));
      }
      return next(err);
    });
}

function likeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передано некорректное id карточки'));
      }
      return next(err);
    });
}

function dislikeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передано некорректное id карточки'));
      }
      return next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
