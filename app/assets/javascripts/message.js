$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="Contents__chat-main__messages__message">
                  <div class="Contents__chat-main__messages__message__upper-info">
                    <div class="Contents__chat-main__messages__message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="Contents__chat-main__messages__message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="Contents__chat-main__messages__message__text">
                    <p class="lower-message__content">
                      <a>${content}</a><br>
                      <a>${img}</a>
                    </p>
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
        url: url,
        type: "POST",
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false,
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.Contents__chat-main__messages').append(html);
      $('.form__message').val('');
      $('.Contents__chat-main').animate({ scrollTop: $('.Contents__chat-main')[0].scrollHeight});
      return false
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(message){
      $('.form__submit').removeAttr('disabled');
    })
  })
});
