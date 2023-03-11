$(document).ready(() => {
  // Init
  const accessToken = '0c7261c430b9cb4d306ea926c90354979874276ea8b7c52ce1c325713365477e';
  const url = 'https://gorest.co.in/public/v2/users';

  // Display file name when selected 
  // $(".custom-file-input").on("change", function () {
  //   var fileName = $(this).val().split("\\").pop();
  //   $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  // });  

  // Animation for flash alert
  setTimeout(() => {
    $('#flash-alert').fadeOut(2000)
  }, 1000);

  // Handle switch status button 
  $('#add-form #status-switch').on('change', function() {
    let isChecked = $(this).prop('checked');
    $('#status-label').html(isChecked?'<b>Active</b>':'<b>Inactive</b>');
    $('#status-hidden-input').val(isChecked?'active':'inactive');
  });

  // Handle event conform delete modal 
  $('#confirmDeleteModal').on('show.bs.modal', function(e) {
    // Get button that triggered the modal
    let button = $(e.relatedTarget);
    // Get id from data-id attribute
    let id = button.data('id');
    let name = button.data('name');
    $(this).find('#id').val(id);
    $(this).find('#name').val(name);
    // Get request method to retrieve data by id
    $.ajax({
      url: `${url}/${id}`,
      type: 'GET',
      success: function(response) {
        console.log('Data retrieved successfully:', response);
        $('#confirmDeleteModal .modal-body strong').text(response.name);
      },
      error: function(xhr, status, error) {
        console.error('Error retrieving data:', error);
      }
    });
  });

  // Handle event on update user modal
  $('#updateUserModal').on('show.bs.modal', function(e) {
    let button = $(e.relatedTarget);
    let id = button.data('id');
    $.ajax({
      url: `${url}/${id}`,
      type: 'GET',
      success: (response) => {
        console.log('Data retrieved successfully:',response);
        // Set datas to inputs in update modal
        $(this).find('#name').val(response.name);
        $(this).find(`#gender-${response.gender}`).prop('checked', true);
        $(this).find('#email').val(response.email);

        const isToggleSwitchChecked = response.status=='active';
        $(this).find('#status-switch').prop('checked', isToggleSwitchChecked);
        $(this).find('#status-label').text(isToggleSwitchChecked?'Active':'Inactive');
        $(this).find('#status-hidden-input').val(isToggleSwitchChecked?'active':'inactive');

        $(this).find('#hidden-user-id').val(response.id);
      },
      error: (xhr, status, error) => {
        console.log('Error:',error);
      }
    });
  });
});