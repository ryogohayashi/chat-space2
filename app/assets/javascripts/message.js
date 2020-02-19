$(function() {
  function buildHTML(message){
    
      if (message.content && message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      } else if (message.content) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<p class="lower-message__content">` +
              message.content +
            `</p>` +
          `</div>` +
        `</div>`
      } else if (message.image) {
        var html = `<div class="message" data-message-id=` + message.id + `>` +
          `<div class="upper-message">` +
            `<div class="upper-message__user-name">` +
              message.user_name +
            `</div>` +
            `<div class="upper-message__date">` +
              message.created_at +
            `</div>` +
          `</div>` +
          `<div class="lower-message">` +
            `<img src="` + message.image + `" class="lower-message__image" >` +
          `</div>` +
        `</div>`
      };
      return html;
    
}

$("#new_message").on('submit',function(){
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(message){
    var html = buildHTML(message)
    $('.main_bar_timeline').append(html);
    $('.main_bar_timeline').animate({scrollTop: $('.main_bar_timeline')[0].scrollHeight},10);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('messageか画像を入力してください')
    })
    return false;
  
  })

  var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message)
        });
        $('.main_bar_timeline').append(insertHTML); 
        $('.main_bar_timeline').animate({ scrollTop: $('.main_bar_timeline')[0].scrollHeight},10);
        }
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
  } 
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
  setInterval(reloadMessages, 7000); 
  }
});