var out="";
var end=false;

window.onload = function(){
	document.getElementById("zero").onclick=function(){
		if(end){
			out = "";
			end=false;
		}
		out += "0";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("one").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "1";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("two").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "2";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("three").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "3";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("four").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "4";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("five").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "5";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("six").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "6";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("seveen").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "7";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("eight").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "8";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("nine").onclick=function(){
		if(end){
			out = "";
			end=false;
		}

		out += "9";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("clear").onclick=function(){
		if(end){
			end=false;
		}
		out = "";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("delete").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}
		if(out=="") return;

		out =out.substring(0,out.length-1);
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("point").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}

		out += ".";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("left").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}

		out += "(";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("right").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}

		out += ")";
		document.getElementById("result").value = out; 
	}
	
	document.getElementById("add").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
			return;
		}

		if(out.charAt(out.length-1)!=='+')
		{
			out += "+";
			document.getElementById("result").value = out; 
		}
	}
	
	document.getElementById("sub").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
		}

		if(out.charAt(out.length-1)!=='-')
		{
			out += "-";
			document.getElementById("result").value = out; 
		}
	}	
	
	document.getElementById("multiply").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
			return;
		}

		if(out.charAt(out.length-1)!=='*')
		{
			out += "*";
			document.getElementById("result").value = out; 
		}
		
		
	}

	document.getElementById("divide").onclick=function(){
		if(end){
			out = "";
			end=false;
			document.getElementById("result").value = out; 
			return;
		}

		if(out.charAt(out.length-1)!=='/')
		{
			out += "/";
			document.getElementById("result").value = out; 
		}
		
		
	}
	
	document.getElementById("calculate").onclick=function(){

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
			document.getElementById("result").value = out;
			return;
		}
		
		out = parseFloat(out) ;
        out = parseFloat(out.toFixed(12) ) ;
		
		document.getElementById("result").value = out;
		
		end=true;
	}

}