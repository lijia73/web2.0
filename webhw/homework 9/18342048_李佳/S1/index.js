window.onload = function () {
	//A,B,C,D,E,SUM
	var buttonclick=[true,true,true,true,true,false]
	var withNum=[false,false,false,false,false]
	
	
	$("#button").mouseleave(Reset)
	$("#control-ring-container .button").click(function(event) {
		if(canClick(event.target))
		{
			action(event.target)
		}
	})
	
	$("#info-bar").click(dealWithSum)
	

	function Reset(){
		$("span").html("")
        $(".text").removeClass("redSpot")
        $("#control-ring-container .button" ).css("background-color", "rgba(48, 63, 159, 1)")
        $("#info-bar").css("background-color", "#707070")
        buttonclick=[true,true,true,true,true,false]
		withNum=[false,false,false,false,false]
	}
	
	function dealWithSum(){
		if(buttonclick[5]){
			var sum=0;
			
			sum+=parseInt($("#A span").html())
			sum+=parseInt($("#B span").html())
			sum+=parseInt($("#C span").html())
			sum+=parseInt($("#D span").html())
			sum+=parseInt($("#E span").html())
		
			$("#sum").html(sum+"")
			$("#info-bar").css("background-color", "#707070")
			buttonclick[5]=false;		
		}		
	}

	function canClick(tar){
		var index=tar.id.charCodeAt()-"A".charCodeAt()
		return (buttonclick[index]&&!withNum[index])
	}

	function action(tar){
		var content=$(tar).find("span")
		
		$(content).addClass("redSpot")
        $(content).text("...")
		
		$("#control-ring-container .button").css("background-color", "#707070")
		buttonclick=[false,false,false,false,false,false]
		
		
		var index=tar.id.charCodeAt()-"A".charCodeAt()
		withNum[index]=true
		$(".button")[index].style.backgroundColor="rgba(48, 63, 159, 1)"
		
		$.get("http://localhost:3000", function(res, status, XHR) {
			$(content).text(res)
			var allnum=0;
			for(var i=0;i<5;i++){
				if(!withNum[i]){					
					buttonclick[i]=true
					$(".button")[i].style.backgroundColor="rgba(48, 63, 159, 1)"
				}
				else{
					allnum++;
					buttonclick[i]=false
					$(".button")[i].style.backgroundColor="#707070"
				}
			}
			if(allnum>=5){
				buttonclick[5]=true
				$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)")
			}
		})
	}
}