(($)->
    
  filterWords = [
    'esoteric',
    'kissed',
    'expansive',
    'peccatophobia',
    'liberalizing',
    'dec',
    'holophyte',
    'tummeler',
    'soloistic',
    'incarnalized',
    'lane',
    'much',
    'preobligating',
    'hello',
    'shirty',
    'mastermind',
    'wainage',
    'immortality',
    'undeniably',
    'pushed',
    'rudy',
    'asdic',
    'arlington',
    'diverse',
    'positivist',
    'spellbind',
    'albatross',
    'overripen',
    'lilibel',
    'undepreciatory',
    'enterozoan',
    'smoko',
    'kachina',
    'lyse',
    'predisguising',
    'instead',
    'iambus',
    'oversight',
    'kahului',
    'pagliacci',
    'hyperbrachycephalic',
    'fedora',
    'advertence',
    'sunken',
    'before',
    'outmoding',
    'chatham',
    'encipher',
    'recollectedness',
    'klister',
    'sassanids',
    'prague',
    'thyestes',
    'meridional',
    'umbria',
    'didache',
    'braunite',
    'oppugnant',
    'nondeceiving',
    'yawner',
    'nonsensitizing',
    'disunite',
    'ecad',
    'berea',
    'bushranging',
    'perisarcous',
    'bilharzia',
    'automatist',
    'daguerreotypist',
    'overdedicating',
    'hisself',
    'pitchblende',
    'radom',
    'unsapiential',
    'rubasse',
    'cutting',
    'epitomizer',
    'kindredness',
    'rocker',
    'dacryorrhea',
    'carpogonium',
    'proximal',
    'fitfulness',
    'pigeonwing',
    'irradiation',
    'flank',
    'dariole',
    'lewes',
    'mayag',
    'delouse',
    'lingcod',
    'diazoalkane',
    'unorganically',
    'difficult',
    'grav',
    'bandolier',
    'antep',
    'curser',
    'unnautical',
    'jolly',
  ];

  
  socket = io.connect()
  messages = $('.messages')
  totalMsg = [];
  currentMsg = 0;
  socket.on 'message', (data)->
    if (data)
      if ($.isArray(data))
        totalMsg = totalMsg.concat(data)
        update()
      else 
        totalMsg.push(data)
        update()
  update = () ->
    while(currentMsg < totalMsg.length)
      addMessage(totalMsg[currentMsg])
      currentMsg++
      

     
  addMessage = (data) ->
    li = $("<li class='animated fadeIn" + data.role + "'>")
    
    icon = $("<div class='user-icon'>")
    icon.html("<img src='/images/default-icon.ico'>")
    
    messageWrap = $("<div class='user-message'>")
    
    userName= $("<span class='user-name'>")
    userName.html(data.user)    
    
    message= $("<span class='the-message'>")
    message.html(filterMessage(data.message))
    
    messageWrap.append(userName, message)
    li.append(icon, messageWrap)
    messages.append(li)

    # Clean old messages to cap at 100 message
    clearOldMessages(messages);
    # Scorll to new message
    messages.scrollTop(messages[0].scrollHeight);
  
  clearOldMessages = (msgs) ->
    if (msgs.find('li').length > 200)
      msgs.find('li').slice(0, 100).remove()
        
  
  filterMessage = (msg) ->
    filterWords.forEach (word, i)->
      regex = new RegExp(word,"gi");
      msg = msg.replace(regex, "****")
    return msg;
    
  $('.btn-send').on 'click', ()->
    socket.emit('send', {message: $('.input-message').val()})
    
  
) jQuery