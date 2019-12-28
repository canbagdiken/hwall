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
		$.post("http://bagdiken.com/demo/hwall/list/",{},function(){},"json")
		.fail(function( data ) {
		 err(data.msg);	 
		
	  }).success(function( data ) {
			
			$(".wall").html("");
			
			$.each(data.list,function(index,row){
				console.log(row);
				var dt = $("<span>").html(row.date);
				var msg = $("<p>").html(row.msg);
				$("<div>").appendTo($(".wall")).append(dt).append(msg);	
			});
			
			
		 
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
	
});



