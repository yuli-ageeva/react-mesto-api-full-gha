import React from "react";

function LoginForm({title, onSubmit, onChange, email, password, buttonName}) {
  return (
    <div className='login__page'>
      <h1 className='login__title'>{title}</h1>
      <form className='login__form' onSubmit={onSubmit}>
        <input className='login__input' type='email' id='email' name='email' placeholder='Email'
               required onChange={onChange} value={email}></input>
        <input className='login__input' type='password' id='password' name='password' placeholder='Пароль' minLength='2'
               maxLength='200' required onChange={onChange} value={password}></input>
        <button className='login__button' id='login' type='submit'>{buttonName}</button>
      </form>
    </div>
  );
}

export default LoginForm;