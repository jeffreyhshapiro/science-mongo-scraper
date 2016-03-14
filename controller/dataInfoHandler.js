$(document).ready(function(){

  $("#getArticle").on("click", function(){
    $.getJSON('/articles', function(data){
      for (var i = 0; i < data.length; i++) {

        // var row = $('<div>').addClass('row')
        // var col = $('<div>').addClass('col s12 m6')
        // var cardColor = $('<div>').addClass('card blue-grey darken-1')
        // var textColor = $('<div>').addClass('card-content white-text')
        // var cardTitle = $('<span>').addClass('card-title')
        // var cardBody = $('<p>').append('text text text')

        // $("#results").append(row).append(col).append(cardColor).append(textColor).append(cardTitle).append(cardBody)
        $("#getArticle").hide();
        var headline = $('<h5>').addClass('col s6 m6').append(data[i].article);
        var link = $('<a>').attr('href',data[i].link).attr('target', '_blank');
        var headlineComplete = $(link).append(headline);
        var description = $('<p>').append(data[i].description);
        var formTag = $('<form>').attr('method', 'POST').attr('action','/submitcomment');
        var divForForm = $('<div>').addClass('input-field col-s6');
        var inputForForm = $('<input>').attr('placeholder','Comment here!').attr('type', 'text').attr('name','scienceComment');
        var labelForForm = $('<label>').attr('for','Comment');
        var submitButton = $('<button>').attr('type','submit').addClass('waves-effect waves-light btn').attr('id','test').append('Submit');
        var commentField = $(formTag).append(divForForm).append(inputForForm).append(labelForForm).append(submitButton);

        $('#results').append(headlineComplete).append(data[i].description).append(commentField)

        console.log(data[i].article);
        console.log(data[i].description);
        console.log(data[i].link);

      };
      $("#test").on('click', function(){
        alert('dafss')
      })
    })
  });
})