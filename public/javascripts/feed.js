$(document).ready(
    function() {
        var totalCharacters = 140;
		var showPosts = false;

        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        });
        getComments();
        /**
         * When the page loads (or is refreshed) we request all comments from the server
         */
 function getComments(){
            $.get( "/getComments", function( data ) {
                var posts = "";
                for(var i=0; i<data.length; i++)
                {
                    posts +="Posted by: "+data[i].user_name+"<div class='row well'><div class='col-xs-9'>"
                        + data[i].comment+"</div></div></div>";
                }
                $( "#feedPosts" ).html( posts );
                $( "#count" ).html(data.length);
                if(!showPosts)
                    $( "#feedPosts" ).hide();
                else
                    $( "#feedPosts" ).show();

                // Recursively call getComments every 10 seconds
                setTimeout(getComments,10000);
            });
        }

		        $("#postForm").submit(function (event) {
            event.preventDefault();
            $.post("/addComment", {
		comment: event.target.inputTextPost.value, user_name: event.target.inputNamePost.value
            }, function (result) {
                $("#charRemaining").html(totalCharacters);
                event.target.reset();
                getComments();
            });
        });
		        $("#feedPosts").click(function (event)
        {
            console.log(event.target.name);
            if(event.target.name)
            {
                $.ajax({
                url: '/removeComment/' + event.target.name,
                type: 'DELETE',
                success: function(result) {
                    getComments();
                }
            });
            }
        });
		$("#btn-count").click(function (event) {
            var options = {};
            if(!showPosts)
            {
                $("#feedPosts").show( "blind", options, 1000);
                showPosts = true;
            }
            else
            {
                $("#feedPosts").hide( "blind", options, 1000);
                showPosts = false;
            }
        });

	});
