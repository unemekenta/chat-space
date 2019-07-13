$(function() {

var search_list = $("#user-search-result");
var add_list = $("#user-add-result");

function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id="add-user-data" data-user-id="${user.id}" data-user-name="${ user.name }">追加</div>
                </div>`
    search_list.append(html);
 }

function appendErrMsgToHTML(msg) {
   var html = `
                 <div class='listview__element--right-icon'>${ msg }</div>
               `
   search_list.append(html);
 }


 function buildHTML(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" id="remove-btn" data-user-id="${user_id}" data-user-name="${ user_name }">削除</div>
                </div>`
    add_list.append(html);
  }

$("#user-search-field").on("keyup", function(e) {
  e.preventDefault();
  var input = $("#user-search-field").val();
  $.ajax({
    type: 'GET',
    url: '/groups/search',
    data: { keyword: input },
    dataType: 'json',
  })
  .done(function(users) {
    $("#user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else {
      appendErrMsgToHTML("該当するユーザーはいません");
    }

    $(document).on("click", "#add-user-data", function(){
      $(this).parent().remove();
      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      buildHTML(user_id, user_name);
    });
    $(document).on("click", "#remove-btn", function(){
        $(this).parent().remove();
    });
  })
  .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
});
});
