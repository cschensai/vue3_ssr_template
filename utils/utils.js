export function formatToken() {
  let token = localStorage.getItem('token');
  if (token === 'null') token = JSON.parse(token);
  else token = token?.replace(/\"/g, '');
  return token;
}
