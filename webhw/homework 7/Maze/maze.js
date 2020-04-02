window.onload = function() {
	const graph=document.getElementById("graph");
	const result=document.getElementById("result");
	var walls=document.getElementsByClassName("wall");
	const start=document.getElementById("start");
	const end=document.getElementById("end");
	
	
	var isplaying =false;
	var ischeating =false;
	
	function setResult(message){
		result.textContent=message;
		result.setAttribute("enable", "");
	}
	
	function resetResult(){
		result.removeAttribute("enable");
	}
	
	function setWall(){
		for(var i=0;i<walls.length;i++){
			walls[i].style.backgroundColor="#FF0000";
		}
	}
	
	function resetWall(){
		for(var i=0;i<walls.length;i++){
			walls[i].style.backgroundColor="#F0F0F0";
		}
	}
	
	
	graph.addEventListener("mouseleave",function(){
		if(!isplaying){
			resetWall();
			return;
		}
		else{
			setResult("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		}
	})
	
	
	start.addEventListener("mouseover",function(){
		isplaying=true;
		resetResult();
		resetWall();
	})
	
	
	end.addEventListener("mouseover",function(){
		if(isplaying){
			setResult("You Win");
			isplaying=false;
		}
		else{
			setResult("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		}
	})
	
	for(var i=0;i<walls.length;i++){
		walls[i].addEventListener("mouseover",function(){
		if(isplaying){
			setResult("You Lose");
			setWall();
			isplaying=false;
		}
	})
	}
		

}