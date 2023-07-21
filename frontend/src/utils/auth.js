import React from "react";

const baseUrl = 'https://auth.nomoreparties.co';

export function login(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при авторизации');
      }
    })
    .then((data) => {
      const {token} = data;
      localStorage.setItem('token', token);
      return data;
    });
}

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при регистрации');
      }
    });
}

export function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при проверке токена');
      }
    });
}
