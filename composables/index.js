export function getLocaleTime() {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}


// use state && reactive
export function useCount() {
  return useState('count', () => 0);
}
