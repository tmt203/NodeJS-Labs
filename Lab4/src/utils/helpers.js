const fetch = require('node-fetch');

module.exports = {
  disabledPreviousBtn: (currentPage) => currentPage == 1 ? 'disabled' : '',
  disableNdextBtn: (currentPage, totalPage) => currentPage == totalPage ? 'disabled' : '',
  isCurrentPage: (page, currentPage) => page == currentPage ? 'active' : '',
  minus: (a, b) => a - b,
  add: (a, b) => a + b,
  pageNumbers: (length) => Array.from({length}, (_, i) => i + 1)
}