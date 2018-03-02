import * as Types from "./actionsTypes";

let dataSource;

export function createDeck(deckData) {
  return function(dispatch) {
    dispatch({
      type: Types.REQUEST_CREATE_DECK,
      deckData
    });

    return dataSource
      .createDeck(deckData)
      .then(deck => {
        dispatch({
          type: Types.CREATE_DECK_SUCCESS,
          deck
        });
      })
      .catch(error => {
        dispatch({
          type: Types.CREATE_DECK_FAILURE,
          deckData,
          error
        });
      });
  };
}

export function updateDeck(deckDataToUpdate) {
  return function(dispatch) {
    dispatch({
      type: Types.REQUEST_UPDATE_DECK,
      deckDataToUpdate
    });

    return dataSource
      .updateDeck(deckDataToUpdate)
      .then(deck => {
        dispatch({
          type: Types.UPDATE_DECK_SUCCESS,
          deck
        });
      })
      .catch(error => {
        dispatch({
          type: Types.UPDATE_DECK_FAILURE,
          deckDataToUpdate,
          error
        });
      });
  };
}

export function deleteDeck(deckId) {
  return function(dispatch) {
    dispatch({
      type: Types.REQUEST_DELETE_DECK,
      id: deckId
    });

    return dataSource
      .deleteDeck(deckId)
      .then(deck => {
        dispatch({
          type: Types.DELETE_DECK_SUCCESS,
          deck
        });
      })
      .catch(error => {
        dispatch({
          type: Types.DELETE_DECK_FAILURE,
          id: deckId,
          error
        });
      });
  };
}

export function createCard(deckId, cardData) {
  return function(dispatch) {
    dispatch({
      type: Types.REQUEST_CREATE_CARD,
      deckId,
      cardData
    });

    return dataSource
      .createCard(deckId, cardData)
      .then(card => {
        dispatch({
          type: Types.CREATE_CARD_SUCCESS,
          card
        });
      })
      .catch(error => {
        dispatch({
          type: Types.CREATE_CARD_FAILURE,
          deckId,
          cardData,
          error
        });
      });
  };
}

export function setDataSource(it) {
  dataSource = it;
}
