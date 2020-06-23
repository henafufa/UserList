//all method implemented after the whole page loaded
$(function(){
    console.log("connected");
    var iterate=0;
    getMethod();

    //this implemented during the form submitted
    $("#userForm").submit(function(event){
        event.preventDefault();
        postMethod();
    });
    
    //this code implemented during user button clicked
    $("#lists").click(function(event){
        event.preventDefault();
        getMethod();
    });

    //this is post method used to send data from the form to the server
    function postMethod(){
        console.log("postMethod called");
        //storing input data from the form
        var mydata={
            name:$("#name").val(),
            email:$("#email").val()
        }
        console.log(mydata.name, mydata.email);
        $.ajax({
            type:"POST",//request method which is POST
            url: window.location + "api/adduser",// the url in which the server listen too, to serve post request
            contentType:"application/json",
            data:JSON.stringify(mydata),
            dataType:"json",
            success:function(user){
                console.log("success post request");
                $("postResponse").html("<p>"+JSON.stringify(user)+ "User added</p>");//display the result come from server
            },
            error:function(e){
                console.log("post error");
                $("#postResponse").html("<p>Add user failed</p>");
            }
        });
        //this will clear the input form after each submit action completed
        $("#name").val("");
        $("#email").val("");
    }

    //this is get method used to request data from server to display on a page
    function getMethod(){
        console.log("get method called");
        $.ajax({
            type:"GET",//request method which is GET
            url: window.location + "api/listuser",// the url in which the server listen too, to serve get request
            success: function(response){
                console.log("users" + JSON.stringify(response));
                $("#getResponse #name").empty();
                $("#getResponse #email").empty();
                //display  the response data of server on table 
                $.each(response, function(u, user){
                    // $("#getResponse #id").append((iterate++ + "<br>"));
                    $("#getResponse #name").append((user.name + "<br>"));
                    $("#getResponse #email").append((user.email + "<br>"));

                })
            },
            error: function(e){
                console.log("get error");
                $("#getResponse").html("<p>unable to show user check server</p>");
            }
        });

    }


});