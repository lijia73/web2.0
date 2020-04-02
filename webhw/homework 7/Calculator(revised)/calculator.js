var out="";
var end=false;

window.onload = function(){
	var numbers=$(".number");
	for(var i=0;i<numbers.length;i++){
		numbers[i].onclick=function(){
			if(end){
				out = "";
				end=false;
			}
			out += ""+this.value;
			$("#result")[0].value = out; 
		}
	}
	$("#clear")[0].onclick=function(){
		if(end){
			end=false;
		}
		out = "";
		$("#result")[0].value = out;
	}	
	$("#delete")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}
		if(out=="") return;

		out =out.substring(0,out.length-1);
		$("#result")[0].value = out;
	}	
	$("#point")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
		}

		out += ".";
		$("#result")[0].value = out; 
	}	
	$("#left")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
		}
		out += "(";
		$("#result")[0].value = out;
	}	
	$("#right")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
		}

		out += ")";
		$("#result")[0].value = out;
	}	
	$("#add")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
			return;
		}
		if(out.charAt(out.length-1)!=='+')
		{
			out += "+";
			$("#result")[0].value = out;
		}
	}	
	$("#sub")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
		}

		if(out.charAt(out.length-1)!=='-')
		{
			out += "-";
			$("#result")[0].value = out;
		}
	}		
	$("#multiply")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out; 
			return;
		}
		if(out.charAt(out.length-1)!=='*')
		{
			out += "*";
			$("#result")[0].value = out;
		}				
	}
	$("#divide")[0].onclick=function(){
		if(end){
			out = "";
			end=false;
			$("#result")[0].value = out;
			return;
		}

		if(out.charAt(out.length-1)!=='/')
		{
			out += "/";
			$("#result")[0].value = out;
		}
		
		
	}	
	$("#calculate")[0].onclick=function(){
		try{
			 while(out[0]=="0")
            {
                out=out.substr(1,(out.length-1));
            }
			
            for(var i=0;i<out.length;i++)
            {
                if(out[i]=="0")
                {
                    if(out[i-1]=="+"||out[i-1]=="-"||out[i-1]=="*"||out[i-1]=="/")
                    {
                        out=out.replace("0","") ;
                    }
                }
            }
			out=eval(out);
		}		
		catch(exception){
			alert(exception);
			out="";
			$("#result")[0].value = out;
			return;
		}		
		out = parseFloat(out) ;
        out = parseFloat(out.toFixed(12) ) ;
		
		$("#result")[0].value = out;		
		end=true;
	}
}