// yyyy-mm-dd hh:mm
const formatDateTime = function(value) {
  let date = new Date(value*1000);
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${hours}:${minutes}`;
}
// mm月dd日
const formatDate = function(value) {
  let date = new Date(value*1000);
  return `${date.getMonth()+1}月${date.getDate()}日`;
}
// yy年mm月dd日
const formatFullDate = function(value) {
  let date = new Date(value*1000);
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}
// yyyy.mm.dd
const formatDated = function(value) {
  let date = new Date(value*1000);
  return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
}
export {
  formatDateTime,
  formatDate,
  formatFullDate,
  formatDated
}