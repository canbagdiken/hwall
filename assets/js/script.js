function preSend(){
	document.getElementById("msg").style.display="none";
	document.getElementById("sendBtn").style.display="none";
	document.getElementById("loader").style.display="block";

	console.log("ok");
	

		

	console.log("ok");

}

function err(msg){
	$(".msg").hide().html(msg).removeClass("success").addClass("error").slideDown();
}
function suc(msg){
	$(".msg").hide().html(msg).removeClass("error").addClass("success").slideDown();
}
function afterSend(){
	loadList();
	$("#msg,#sendBtn").show()
	$("#loader").hide()
	
	
}
function loadList(){
		$.post("http://bagdiken.com/demo/hwall/list/",{token:$("body").attr("data-token")},function(){},"json")
		.fail(function( data ) {
		 err(data.msg);	 
		
	  }).success(function( data ) {
			
			$(".wall").html("");
			
			$.each(data.list,function(index,row){
				console.log(row);
				var dt = $("<span>").html(row.date);
				var msg = $("<p>").html(row.msg);
				
				var msgRow = $("<div>").appendTo($(".wall")).append(dt).append(msg);	
				if(row.id !== undefined){
				msgRow.append($("<button>").attr("data-id",row.id).html("X"));	
				msgRow.append($("<em>").html(row.ip));	
				
				}
				
			});
			
			
		 
	  }).always(function(){
	  });
	
}



function login(){
		$.post("http://bagdiken.com/demo/hwall/login/",{pw:$("#loginpw").val()},function(){},"json")
		.fail(function( data ) {
		 err(data.msg);	 
		
	  }).success(function( data ) {
					 
	  }).always(function(){
	  });
	
}




$("document").ready(function(){
	loadList();
	
	$("#sendBtn").click(function(){
		
	if($("#msg").val().trim().length < 1){
		err("Your message was empty :(");
		return;
	}	
	if($("#msg").val().trim().length < 5){
		err("Your message was too short :(");
		return;
	}	
	if($("#msg").val().trim().length > 250){
		err("Your message was too long :(");
		return;
	}
	
	
	preSend();
		$.post("http://bagdiken.com/demo/hwall/send/",{msg:$("#msg").val()},function(){},"json")
		.fail(function( data ) {
		 err(data.msg);
		 
		
	  }).success(function( data ) {
		  suc(data.msg);
		 
	  }).always(function(){
		afterSend();
	  });
	console.log("ok");
});




	$("#login").click(function(){
		$("#manage").toggle();
	});


	$("#loginBtn").click(function(){
		
		$("#manage").hide();
	if($("#pw").val().trim().length < 1){
		err("Your password was empty :(");
		return;
	}	

	
	
	preSend();
			$.post("http://bagdiken.com/demo/hwall/login/",{pw:$("#pw").val()},function(){},"json")
		.fail(function( data ) {
		 err("tech err");
		 
		
	  }).success(function( data ) {
		  console.log(data.status);
		   if(data.login){
			  $("body").attr("data-token",data.token);
			suc(data.msg);  
			afterSend();
		  }else{
			  err(data.msg);
		  }
		 
	  }).always(function(){
		afterSend();
		$("#pw").val("");
	  });
	console.log("ok");
});





	
});



