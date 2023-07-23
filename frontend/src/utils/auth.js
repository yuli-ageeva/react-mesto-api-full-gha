import React from "react";
import api from "./Api";

const baseUrl = 'https://api.yuliaageeva.nomoredomains.xyz';
const credentials = 'include'

export function login(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: credentials,
    body: JSON.stringify({email, password}),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при авторизации');
      }
    })
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

export function checkAuth() {
  return api.getUserInfo();
}
