(function($) {
  return $('#searchForm').submit(function(e) {
    var data, form;
    e.preventDefault();
    form = $(this);
    data = form.serialize();
    return $.post('query', data, function(data) {
      var table;
      console.log(data);
      $('.qtime').text(data.time + 'ms');
      $('.numresults').text(data.users.length + ' users');
      if (data.users.length > 0) {
        console.log(data);
        table = $('.table tbody');
        $('.result-list').addClass('has-result');
        table.text('');
        return data.users.forEach(function(user, i) {
          return table.append('<tr class="bounceInUp animated"><td>' + user.full_name + '</td><td>' + user.email + '</td><td>' + user.city + '</td></tr>');
        });
      } else {
        return $('.result-list').removeClass('has-result');
      }
    });
  });
})(jQuery);
