import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";

function Register({handleRegister}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleRegister(formValue.email, formValue.password);
  };

  return (
    <div>
      <LoginForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        title={'Регистрация'}
        username={formValue.email}
        password={formValue.password}
        buttonName={'Зарегистрироваться'}
      />
      <label className="login__description">
        Уже зарегистрированы?<Link className='login__link' to='/sign-in'>Войти</Link>
      </label>
    </div>
  );
}

export default Register;
