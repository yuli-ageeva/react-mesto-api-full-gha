class Api {
  constructor({baseUrl, commonHeaders, credentials}) {
    this.baseUrl = baseUrl;
    this.commonHeaders = commonHeaders;
    this.credentials = credentials;
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.commonHeaders,
      credentials: this.credentials,
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.commonHeaders,
      credentials: this.credentials,
    })
      .then(this._checkResponse)
  }

  setNewInfo(data) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.commonHeaders,
      credentials: this.credentials,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._checkResponse)
  }

  addNewCard(data) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.commonHeaders,
      credentials: this.credentials,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(this.baseUrl + '/cards/' + id, {
      method: 'DELETE',
      headers: this.commonHeaders,
      credentials: this.credentials,
    })
      .then(this._checkResponse)
  }

  setNewAvatar(data) {
    return fetch(this.baseUrl + '/users/me/avatar', {
      method: "PATCH",
      headers: this.commonHeaders,
      credentials: this.credentials,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(this._checkResponse)
  }

  _setLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'PUT',
      headers: this.commonHeaders,
      credentials: this.credentials,
    })
      .then(this._checkResponse)
  }

  _deleteLike(id) {
    return fetch(this.baseUrl + '/cards/' + id + '/likes', {
      method: 'DELETE',
      headers: this.commonHeaders,
      credentials: this.credentials,
    })
      .then(this._checkResponse)
  }

  toggleLike(id, isLiked) {
    if (isLiked) {
      return this._deleteLike(id)
    } else {
      return this._setLike(id)
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}


const api = new Api({
  baseUrl: 'https://api.yuliaageeva.nomoredomains.xyz',
  commonHeaders: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

export default api
