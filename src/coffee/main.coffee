(($) -> 
 
  $('#searchForm').submit (e)->
      e.preventDefault();
      form = $(this)
      data = form.serialize()
      $.post 'query', data, (data)->
        console.log(data)
        $('.qtime').text(data.time + 'ms')
        $('.numresults').text(data.users.length + ' users')
        if (data.users.length > 0)
          console.log(data)
          table = $('.table tbody')
          $('.result-list').addClass('has-result');
          table.text('');
          data.users.forEach (user, i) ->
            table.append('<tr class="bounceInUp animated"><td>' + user.full_name + '</td><td>' + user.email + '</td><td>' + user.city + '</td></tr>')
          
        else 
          $('.result-list').removeClass('has-result');
) jQuery