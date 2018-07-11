$(document).ready(function () {
    //JQuery to save article when "Save Article" button clicked
    $(".saveArticleBtn").on("click", function () {
        const articleId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/saved/" + articleId
        }).then(function (data) {
            window.location.href = '/';
        })
    });

    //JQuery to show all saved articles when "Saved Articles" button clicked
    $("#savedArticles").on("click", function () {
        $.get("/saved", function () {
        }).done(function () {
            window.location.href = '/saved';
        });
    });//End of savedArticle

    //JQuery to delete article when "Delete Article" button clicked
    $(".unsaveArticleBtn").on("click", function () {
        const articleId = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/unsaved/" + articleId,
            data: {
                id: articleId
            }
        }).then(function (data) {
            window.location.href = '/saved';
        });
    });//End of unsaveArticle


    //JQuery to get all notes when addNoteBtn clicked
    $(document).on("click", ".addNoteBtn", function () {
        // Empty the notes from the note section
        $("#notes").empty();
        var articleId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/getNote/" + articleId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h6>" + data.title + "</h6>");
            //loop thru note array
            console.log("data.note",data.note);
            if (data.note.length !== 0) {
                $("#notes").append("<p id='actualnotes' class='form-control mb-4 bg-warning'></p>");
                $("#actualnotes").append("<ul id='notelist'>");
                for (var i = 0; i < data.note.length; i++) {
                    $('#notelist').append("<li>" + data.note[i].title + ": " + data.note[i].body + " " +
                        // "<button data-id='" + data.note[i]._id +
                        // "' id='deletenote' class='btn btn-warning btn-sm'>Delete</button></li>");
                        "<button data-note-id='" + data.note[i]._id + "'data-article-id='" + articleId + "'id='deletenote' class='btn btn-warning btn-sm'>Delete</button></li>");
                }
                $('#actualnotes').append("</ul>");
            }
            else {
                // $('#notes').append("<p class='form-control mb-2 bg-warning'>There aren't any notes yet.</p>");
                $('#notes').append("<p class='form-control mb-4 bg-warning'>There aren't any notes yet.</p>");
            }
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' class='form-control mb-2' name='title' placeholder='Your Name'>");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' class='form-control mb-4' name='body' placeholder='Note'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-secondary mr-2 mb-2'>Save Note</button>");
            $("#notes").append("<button data-dismiss='modal' class='btn btn-danger mb-2'>Cancel</button>");
        });
    });//End of addNoteBtn


    //JQuery to save note on saveNoteBtn click
    $(document).on("click", "#savenote", function (e) {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/addNote/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function (data) {
            //Get notes after save a new note
            getNote(thisId);
        });
        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });//End of save note


    //JQuery to delete note 
    $(document).on("click", "#deletenote", function (e) {
        //$("#notes").empty();
        let noteId = $(this).attr("data-note-id");
        let articleId  = $(this).attr("data-article-id");

        $.ajax({
            method: "DELETE",
            url: "/deleteNote/" + noteId + "/" + articleId
        }).done(function (data){
            //Refresh notes after delete 
            getNote(articleId);
        });
    });//End of delete note


    //helper function to get note after delete or add a new note
    function getNote (thisId) {
        $("#notes").empty();
        $.ajax({
            method: "GET",
            url: "/getNote/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h6>" + data.title + "</h6>");
            //loop thru note array
            console.log("data.note",data.note);
            if (data.note.length !== 0) {
                $("#notes").append("<p id='actualnotes' class='form-control mb-4 bg-warning'></p>");
                $("#actualnotes").append("<ul id='notelist'>");
                for (var i = 0; i < data.note.length; i++) {
                    // for (var j = 0; j < )
                    $('#notelist').append("<li>" + data.note[i].title + ": " + data.note[i].body + " " +
                        // "<button data-id='" + data.note[i]._id +
                        // "' id='deletenote' class='btn btn-warning btn-sm'>Delete</button></li>");
                        "<button data-note-id='" + data.note[i]._id + "'data-article-id='" + thisId + "'id='deletenote' class='btn btn-warning btn-sm'>Delete</button></li>");
                }
                $('#actualnotes').append("</ul>");
            }
            else {
                // $('#notes').append("<p class='form-control mb-2 bg-warning'>There aren't any notes yet.</p>");
                $('#notes').append("<p class='form-control mb-4 bg-warning'>There aren't any notes yet.</p>");
            }
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' class='form-control mb-2' name='title' placeholder='Your Name'>");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' class='form-control mb-4' name='body' placeholder='Note'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-secondary mr-2 mb-2'>Save Note</button>");
            $("#notes").append("<button data-dismiss='modal' class='btn btn-danger mb-2'>Cancel</button>");
        
        });
    };//End of getNote()

})