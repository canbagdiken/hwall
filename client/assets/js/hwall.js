/*
* hwall v1.0 (29-12-19)
* Can Bağdiken, Yiğit Demircan, Berkay Ömerbaş
* https://github.com/canbagdiken/hwall
*/

// API address variable
var API = "http://bagdiken.com/demo/hwall/API/";

// hide msg sending functions and show loading effect
function preSend() {  
	$("#msg,#sendBtn").hide();
    $("#loader").show();
}

// show error msg
function err(msg) {
    $(".msg").hide().html(msg).removeClass("success").addClass("error").slideDown();
}


// show success msg
function suc(msg) {
    $(".msg").hide().html(msg).removeClass("error").addClass("success").slideDown();
}


// hide loader and show msg sending functions
function afterSend() {
    loadList();
    $("#msg,#sendBtn").show();
    $("#loader").hide();

}
/*
* Request and load all messages
*/
function loadList() {
    $.post(API+"list/", {
            token: $("body").attr("data-token")
        }, function() {}, "json")
        .fail(function(data) {
            err("Technical problem, please report!");

        }).success(function(data) {

            $(".wall").html("");

            $.each(data.list, function(index, row) {
                console.log(row);
                var dt = $("<span>").html(row.date);
                var msg = $("<p>").html(row.msg);

                var msgRow = $("<div>").appendTo($(".wall")).append(dt).append(msg);
                if (row.id !== undefined) {
                    msgRow.append($("<button>").attr("data-id", row.id).html("X"));
                    msgRow.append($("<em>").html(row.ip));
                }
            });
        }).always(function() {});
}




// when jquery loaded successfully
$("document").ready(function() {
    loadList();
	// message send function
    $("#sendBtn").click(function() {
        if ($("#msg").val().trim().length < 1) {
            err("Your message was empty :(");
            return;
        }
        if ($("#msg").val().trim().length < 5) {
            err("Your message was too short :(");
            return;
        }
        if ($("#msg").val().trim().length > 250) {
            err("Your message was too long :(");
            return;
        }

        preSend();
        $.post(API+"send/", {msg: $("#msg").val()}, function() {}, "json")
            .fail(function(data) {
                err(data.msg);
            }).success(function(data) {
                suc(data.msg);
            }).always(function() {
                afterSend();
            });
    });

	// delete function for posts
    $(".wall").delegate("button", "click", function() {
        var r = confirm("Are you sure?");
        if (r == true) {
            $.post(API+"delete/", {

                    token: $("body").attr("data-token"),
                    del: ($(this).attr("data-id"))
                }, function() {}, "json")
                .fail(function(data) {
                    err("Technical problem, please report!");

                }).success(function(data) {
                    console.log(data.status);
                    if (data.delete) {
                        suc(data.msg);
                        afterSend();
                    } else {
                        err(data.msg);
                    }
                }).always(function() {
                    afterSend();
                });
        }
    });
	
	// show/hide for manage button
    $("#login").click(function() {
        $("#manage").toggle();
    });

	/*
	* Send password and check. 
	* If success add token to body as attribute
	*/
    $("#loginBtn").click(function() {

        $("#manage").hide();
        if ($("#pw").val().trim().length < 1) {
            err("Your password was empty :(");
            return;
        }
        preSend();
        $.post(API+"login/", {
                pw: $("#pw").val()
            }, function() {}, "json")
            .fail(function(data) {
                err("Technical problem, please report!");
            }).success(function(data) {
                console.log(data.status);
                if (data.login) {
                    $("body").attr("data-token", data.token);
                    suc(data.msg);
                    afterSend();
                } else {
                    err(data.msg);
                }
            }).always(function() {
                afterSend();
                $("#pw").val("");
            });
        console.log("ok");
    });

});