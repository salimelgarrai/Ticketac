console.log('test')

$('.reload').on('click', function () {
  var id = $(this)[0].dataset.id
  var value = $(this).parent().text()[0]
  $(this).parent()[0].innerHTML = `<form action="/home/update" method="post">
  <input type="number" style="width: 40px" name="value" value="value"  required>
  <input type="hidden" name="id" value="${id}">
    <button type="submit" class="btn btn-Light position-relative rounded-pill"><i class="fas fa-sync-alt text-danger ms-2"></i></button></form>
    `
})
