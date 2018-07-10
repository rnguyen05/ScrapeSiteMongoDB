$(document).ready(function () 
{
    //JQuery to save article when "Save Article" button clicked
    $(".saveArticleBtn").on("click", function () {
       const articleId = $(this).attr("data-id");
       $.ajax({
           method: "POST",
           url: "/saved/" + articleId
       }).then(function(data){
            window.location.href='/';
       })
    });

    //JQuery to show all saved articles when "Saved Articles" button clicked
    $("#savedArticles").on("click", function(){
        $.get("/saved", function () {
        }).done(function () {
            window.location.href='/saved';
        });
    });

    //JQuery to delete article when "Delete Article" button clicked
    $(".unsaveArticleBtn").on("click", function () {
        const articleId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/unsaved/" + articleId,
            data: {
                id: articleId
            }
        }).then(function(data){
             window.location.href='/saved';
        });
    });


    //JQuery to save note on saveNoteBtn click
    $(".saveNoteBtn").on("click", function () {
        // $("#notes").empty();
        let articleId = $('.noteTitle').attr("data-id");
        let noteTitle= $('.noteTitle').val();
        let noteBody = $('.noteBody').val();

        $.ajax({
          method: "POST",
          url: "/addNote/" + articleId,
          data: {
            title: noteTitle,
            body: noteBody
          }
        })
        // With that done, add the note information to the page
        .done(function(data) {
            // console.log(">>>data after done>>>>",data);
            // // $("#myModal").modal("hide");
            // $("#notes").append("<p id='actualnotes'></p>");
            // if (data.note.length > 0) {
            //     $("#actualnotes").append("<ul id='notelist'>");
            //     for (var i = 0; i < data.note.length; i++) {
            //         $('#notelist').append("<li id='" + data.note[i]._id + "'>" + data.note[i].body + " " +
            //         "<button data-id='" + data.note[i]._id +
            //         "' id='deletenote'>Delete</button></li>");
            //     }
            //     $('#actualnotes').append("</ul>");
            // } else {
            //     $('#actualnotes').text("There aren't any notes yet.");
            // }
            // window.location.href = '/';
            $("#noteForm")[0].reset();
        });
    });


    //JQuery to get notes when Notes button clicked
    $(".addNoteBtn").on("click", function () {
        $("#notes").empty();
        let articleId = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/getNote/" + articleId
        }).done(function (data){
            $("#notes").append("<p id='note'></p>");
            if (data.note.length > 0) {
                $("#note").append("<ul id='notelist'>");
                for (var i = 0; i < data.note.length; i++) {
                    $('#notelist').append("<li id='" + data.note[i]._id + "'>" + "<strong>" + data.note[i].title + ": </strong>" + data.note[i].body + " " +
                    "<button data-id='" + data.note[i]._id +
                    "' class='deleteNote'>Delete</button></li>");
                }
                $('#note').append("</ul>");
            } else {
                $('#note').text("There aren't any notes yet.");
            }
            console.log(data);
        });
    });


    //JQuery to delete note 
    $(".deleteNote").on("click", function () {
        //$("#notes").empty();
        let noteId = $(this).attr("data-id");
        console.log("delete noteId", noteId);
        alert("delete button clicked");
        // $.ajax({
        //     method: "POST",
        //     url: "/deleteNote/" + articleId
        // }).done(function (data){
        //     console.log("????data.note???", data.note);
        //     $("#notes").append("<p id='actualnotes'></p>");
        //     if (data.note.length > 0) {
        //         $("#actualnotes").append("<ul id='notelist'>");
        //         for (var i = 0; i < data.note.length; i++) {
        //             $('#notelist').append("<li id='" + data.note[i]._id + "'>" + data.note[i].body + " " +
        //             "<button data-id='" + data.note[i]._id +
        //             "' id='deletenote'>Delete</button></li>");
        //         }
        //         $('#actualnotes').append("</ul>");
        //     } else {
        //         $('#actualnotes').text("There aren't any notes yet.");
        //     }
        // });
    });

})