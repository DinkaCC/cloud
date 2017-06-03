import fetch from '../utils/fetch';

export function loginByUser(user, password) {
  const data = {
    user,
    password
  };
  console.log(data)
  // return fetch({
  //   url: '/login/loginbyemail',
  //   method: 'post',
  //   data
  // });
}

// export function logout() {
//   return fetch({
//     url: '/login/logout',
//     method: 'post'
//   });
// }
//
// export function getInfo(token) {
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   });
// }
