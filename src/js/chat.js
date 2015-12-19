(function($) {
  var addMessage, clearOldMessages, currentMsg, filterMessage, filterWords, messages, socket, totalMsg, update;
  filterWords = ['esoteric', 'kissed', 'expansive', 'peccatophobia', 'liberalizing', 'dec', 'holophyte', 'tummeler', 'soloistic', 'incarnalized', 'lane', 'much', 'preobligating', 'hello', 'shirty', 'mastermind', 'wainage', 'immortality', 'undeniably', 'pushed', 'rudy', 'asdic', 'arlington', 'diverse', 'positivist', 'spellbind', 'albatross', 'overripen', 'lilibel', 'undepreciatory', 'enterozoan', 'smoko', 'kachina', 'lyse', 'predisguising', 'instead', 'iambus', 'oversight', 'kahului', 'pagliacci', 'hyperbrachycephalic', 'fedora', 'advertence', 'sunken', 'before', 'outmoding', 'chatham', 'encipher', 'recollectedness', 'klister', 'sassanids', 'prague', 'thyestes', 'meridional', 'umbria', 'didache', 'braunite', 'oppugnant', 'nondeceiving', 'yawner', 'nonsensitizing', 'disunite', 'ecad', 'berea', 'bushranging', 'perisarcous', 'bilharzia', 'automatist', 'daguerreotypist', 'overdedicating', 'hisself', 'pitchblende', 'radom', 'unsapiential', 'rubasse', 'cutting', 'epitomizer', 'kindredness', 'rocker', 'dacryorrhea', 'carpogonium', 'proximal', 'fitfulness', 'pigeonwing', 'irradiation', 'flank', 'dariole', 'lewes', 'mayag', 'delouse', 'lingcod', 'diazoalkane', 'unorganically', 'difficult', 'grav', 'bandolier', 'antep', 'curser', 'unnautical', 'jolly'];
  socket = io.connect('http://localhost:3000');
  messages = $('.messages');
  totalMsg = [];
  currentMsg = 0;
  socket.on('message', function(data) {
    if (data) {
      if ($.isArray(data)) {
        totalMsg = totalMsg.concat(data);
        return update();
      } else {
        totalMsg.push(data);
        return update();
      }
    }
  });
  update = function() {
    var results;
    results = [];
    while (currentMsg < totalMsg.length) {
      addMessage(totalMsg[currentMsg]);
      results.push(currentMsg++);
    }
    return results;
  };
  addMessage = function(data) {
    var icon, li, message, messageWrap, userName;
    li = $("<li class='animated fadeIn" + data.role + "'>");
    icon = $("<div class='user-icon'>");
    icon.html("<img src='/images/default-icon.ico'>");
    messageWrap = $("<div class='user-message'>");
    userName = $("<span class='user-name'>");
    userName.html(data.user);
    message = $("<span class='the-message'>");
    message.html(filterMessage(data.message));
    messageWrap.append(userName, message);
    li.append(icon, messageWrap);
    messages.append(li);
    clearOldMessages(messages);
    return messages.scrollTop(messages[0].scrollHeight);
  };
  clearOldMessages = function(msgs) {
    if (msgs.find('li').length > 200) {
      return msgs.find('li').slice(0, 100).remove();
    }
  };
  filterMessage = function(msg) {
    filterWords.forEach(function(word, i) {
      var regex;
      regex = new RegExp(word, "gi");
      return msg = msg.replace(regex, "****");
    });
    return msg;
  };
  return $('.btn-send').on('click', function() {
    return socket.emit('send', {
      message: $('.input-message').val()
    });
  });
})(jQuery);
