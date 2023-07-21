import successLogo from '../images/success.svg'
import failLogo from '../images/fail.svg'

function InfoToolTip(props) {
  return (
    <div className={`popup  ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup_tooltip popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} onSubmit={props.onSubmit}
                aria-label="закрыть"></button>
        <img className='popup__tooltip-image' src={props.isSuccess ? successLogo : failLogo}
             alt={props.isSuccess ? 'регистрация прошла успешно' : 'неудачная попытка регистрации'}/>
        <h2
          className='popup__tooltip-heading'>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;


