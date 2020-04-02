window.onload = function() {
	var isplaying =false;
	var ischeating =false;	
	function setResult(message){
		$("#result")[0].textContent=message;
		$("#result")[0].setAttribute("enable", "");
	}	
	function resetResult(){
		$("#result")[0].removeAttribute("enable");
	}	
	function setWall(){
		$(".wall").css("background-color", "#FF0000");
	}	
	function resetWall(){
		$(".wall").css("background-color", "#F0F0F0");
	}		
	$("#graph").mouseleave(function(){
		if(!isplaying){
			resetWall();
			return;
		}
		else{
			setResult("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		}
	});	
	$("#start").mouseover(function(){
		isplaying=true;
		resetResult();
		resetWall();
	});	
	$("#end").mouseover(function(){
		if(isplaying){
			setResult("You Win");
			isplaying=false;
		}
		else{
			setResult("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		}
	});	
	
	$(".wall").mouseover(function(){
		if(isplaying){
			setResult("You Lose");
			setWall();
			isplaying=false;
		}
	});
}