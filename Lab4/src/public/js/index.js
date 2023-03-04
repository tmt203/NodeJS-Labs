// Redirect to user info page when click a row
$('.clickable-row').on('click', () => {
  window.location.href = $(this).data('href');
});