$(document).ready(function () 
{
    //JQuery to save article when "Save Article" button clicked
    $(".saveArticleBtn").on("click", function () {
       const articleId = $(this).attr("data-id");
       console.log(">>>>ArticleId>>>", articleId);
       $.ajax({
           method: "POST",
           url: "/saved/" + articleId,
           data: {
               id: articleId
           }
       }).then(function(data){
            console.log(data);
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
        console.log(">>>>ArticleId>>>", articleId);
        $.ajax({
            method: "POST",
            url: "/unsaved/" + articleId,
            data: {
                id: articleId
            }
        }).then(function(data){
             console.log(data);
             window.location.href='/saved';
        });
     });

     

})