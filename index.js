const channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas'
]

const inputs = document.querySelectorAll('nav > a')

inputs.forEach(input => {
  input.addEventListener('click', handleClickEvent)
})

function handleClickEvent(event) {
  const show = event.target.id
  $('.filter').removeClass('selected')
  $('#' + show).toggleClass('selected')
  let lisAll = document.querySelectorAll('li')
  $(lisAll).css('display', 'grid')

  switch (show) {
    case 'online':
      let lisOff = document.querySelectorAll('li.off')
      $(lisOff).css('display', 'none')
      break
    case 'offline':
      let lisOn = document.querySelectorAll('li.on')
      $(lisOn).css('display', 'none')
      break
  }
}
gatherApiData(channels)

function gatherApiData(channelArr) {
  channelArr.forEach(function(channel) {
    const url = 'https://wind-bow.glitch.me/twitch-api/streams/' + channel + '?callback=?'
    $.getJSON(url, function(data) {
      if (data.stream) {
        addItem(data.stream.channel, 'live')
      } else {
        getDatafromChannelApi(channel)
      }
    })
  })
}
function getDatafromChannelApi(channel) {
  let url = 'https://wind-bow.glitch.me/twitch-api/channels/' + channel + '?callback=?'
  $.getJSON(url, function(data) {
    addItem(data, 'offline')
  })
}
function addItem(data, state) {
  if (state === 'live') {
    let html = '<li class="on">'
    html += '<img src="' + data.logo + '">'
    html += '<h3>' + data.display_name + '</h3>'
    html += '<h5>' + data.status + '</h5>'
    html += '<p>' + data.game + '</p>'
    html += '<a href="' + data.url + '" target="_blank">'
    html += '<i class="fa fa-play-circle fa-4x green" title="Watch Stream"></i></a></li>'
    $(html).appendTo('#itemShelf')
  } else if (state === 'offline') {
    let html = '<li class="transparent off">'
    html += '<img src="' + data.logo + '">'
    html += '<h3>' + data.display_name + '</h3>'
    html += '<a href="' + data.url + '" target="_blank">'
    html += '<i class="fa fa-play-circle fa-4x" title="Go to Channel Page"></i></a></li>'
    $(html).appendTo('#itemShelf')
  }
}
