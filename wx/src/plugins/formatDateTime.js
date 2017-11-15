const formatDateTime = function(value) {
  let date = new Date(value*1000);
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${hours}:${minutes}`;
}
const formatDate = function(value) {
  let date = new Date(value*1000);
  return `${date.getMonth()}月${date.getDate()}日`;
}
export {
  formatDateTime,
  formatDate
}