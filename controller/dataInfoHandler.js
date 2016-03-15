$(document).ready(function(){

//All data is sent straight to the browser. Every time the read article button is clicked a new article is shown.  Counter starts at -1 so the article at index 0 can be shown.

  var counter = -1;

  $("#getArticle").on("click", function(){

    counter++
    $("#results").empty();
    $("#introMessage").remove();

    $.getJSON('/articles', function(data){
      for (var i = 0; i < data.length; i++) {

        console.log('the value of counter is '+counter)

        var headline = $('<h5>').addClass('col s6 m6').append(data[counter].article);
        var link = $('<a>').attr('href',data[counter].link).attr('target', '_blank');
        var headlineComplete = $(link).append(headline);
        var description = $('<p>').append(data[counter].description);
        var formTag = $('<form>').attr('method', 'POST').attr('action','/submitcomment');
        var divForForm = $('<div>').addClass('input-field col-s6');
        var inputForForm = $('<input>').attr('placeholder','Comment here!').attr('type', 'text').attr('name','scienceComment');
        var labelForForm = $('<label>').attr('for','Comment');
        var submitButton = $('<button>').attr('type','submit').addClass('waves-effect waves-light btn').attr('id','test').append('Submit');
        var commentField = $(formTag).append(divForForm).append(inputForForm).append(labelForForm).append(submitButton);

        $('#results').append(headlineComplete).append(description).append(commentField)

        // console.log(data[i].article);
        // console.log(data[i].description);
        // console.log(data[i].link);

        if (counter == data.length - 1) {
          counter = -1
        };

        break;
      };
    });
  });
})