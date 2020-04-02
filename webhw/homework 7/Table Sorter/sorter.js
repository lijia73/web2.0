window.onload = function() {
	var time=0;
	$("table").tablesorter();
	
	$("th").click(function(){
		$("th").css("background-color","#000066");
		this.style.backgroundColor="#99CCFF";
		if(this.style.backgroundImage=="url(\"ascend.png\")"){
			this.style.backgroundImage="url('descend.png')";
		}
		else{
			this.style.backgroundImage="url('ascend.png')";
		}		
	});
}