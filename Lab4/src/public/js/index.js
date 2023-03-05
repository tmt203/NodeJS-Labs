// Redirect to user info page when click a row
$('.clickable-row').on('click', function() {
  // Extract the URL from the row data attribute and redirect to the page
  window.location.href = $(this).data('href'); 
});

// Active & Inactive text display when click status switch button
$('#addUserModal #status').on('change', function() {
  let isChecked = $(this).prop('checked');
  $('.status').val(isChecked?'active':'inactive');
  $('#statusText').html(isChecked?'Active':'Inactive');
});

// Update user modal open
$('#updateUserModal').on('shown.bs.modal', async function(event) {
  // Get button that triggered the modal
  let button = $(event.relatedTarget); 
  // Extract user ID from data-id attribute
  let userId = button.data('id');
  // Set that user ID to hidden input
  $(this).find('#id').val(userId);

  try {
    // Fetch user data by id  
    const response = await fetch('https://gorest.co.in/public/v2/users/' + userId)
    const user = await response.json();    
    console.log('User:',user);
    // Set data to input field of update modal
    $(this).find('#name').val(user.name);
    $(this).find('#email').val(user.email);
    $(this).find(`#${user.gender}`).prop('checked', true);
    $(this).find('#status').prop('checked',(user.status=='inactive')?false:true);
    
  } catch(err) {
    console.log('Something went wrong.');
    console.log(err);
  }
});
