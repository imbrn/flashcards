import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import TextArea from 'react-textarea-autosize';
import CardModel from '../../CardModel';

class CreateCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      card: props.defaultValue || CardModel(),
    };

    this.onClickConfirm = this.onClickConfirm.bind(this);
    this.onChangeFront = this.onChangeFront.bind(this);
    this.onChangeBack = this.onChangeBack.bind(this);
  }

  render() {
    const { deckModel, className, onCancel } = this.props;
    const card = this.state.card;

    return (
      <div className={classnames('create-card', className)}>
        <div className='create-card-bg' />

        <div className='create-card-content'>

          <div className='create-card-content-edit'>

            <div className='create-card-side create-card-side-front'>
              <TextArea className='textarea' placeholder={deckModel.front}
                value={card.front}
                onChange={this.onChangeFront}
              />
            </div>

            <div className='create-card-side create-card-side-back'>
              <TextArea className='textarea' placeholder={deckModel.back}
                value={card.back}
                onChange={this.onChangeBack}
              />
            </div>

          </div>

          <div className='create-card-content-buttons'>

            <button className='button create-card-button create-card-button-confirm'
              onClick={this.onClickConfirm}>
              Confirm
            </button>
            
            <button className='button create-card-button create-card-button-cancel'
              onClick={onCancel}>
              Cancel
            </button>

          </div>

        </div>
      </div>
    );
  }

  onChangeFront(e) {
    const front = e.target.value;
    this.setState((prevState) => {
      return {
        card: prevState.card.set('front', front)
      }
    });
  }

  onChangeBack(e) {
    const back = e.target.value;
    this.setState((prevState) => {
      return {
        card: prevState.card.set('back', back)
      }
    });
  }

  onClickConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state.card);
    }
  }

}

CreateCard.propTypes = {
  defaultValue: PropTypes.instanceOf(CardModel),
};

export default CreateCard;
