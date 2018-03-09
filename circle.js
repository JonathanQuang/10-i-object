console.log("loaded");
svg = document.getElementById("svgElement");
idCounter = 0;

circleSpace = [];

var insertCircle = function(x,y,id){

	theCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	theCircle.setAttribute("cx",x.toString());
	theCircle.setAttribute("cy",y.toString());
	theCircle.setAttribute("r","25");
	theCircle.setAttribute("id",id);
	theCircle.addEventListener("click",colorCircle);
	svg.append(theCircle);
	console.log(theCircle);
}

var makeChanges = function(){
	relevantCircle = document.getElementById(this.id.toString());
	relevantCircle.setAttribute("cx",this.x.toString());
	relevantCircle.setAttribute("cy",this.y.toString());
	relevantCircle.setAttribute("fill",this.color);
}

var newCircle = function(x,y,id){
	retCircle = {
		"id":id,
		"x":x,
		"y":y,
		"color":"black",
		"createCircle":function(cx,cy){insertCircle(cx,cy,this.id);},
		"renderChanges":makeChanges,
	};
	circleSpace.push(retCircle);
	return retCircle;
}



var createCircle = function(e){
	console.log('create');
	theCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");

	idCounter +=1;
	newCirc = newCircle(e.offsetX,e.offsetY,idCounter);
	newCirc.createCircle(newCirc.x,newCirc.y);
	
}

var colorCircle = function(e){
	console.log('color change');
	relevantCircle = null;
	for (i = 0; i < circleSpace.length; i++){
		if (this.id == circleSpace[i].id.toString()){
			relevantCircle = circleSpace[i];
		}
	}
	relevantCircle.color="red";
	relevantCircle.renderChanges();
	e.stopPropagation();
	this.addEventListener("click",removeCircle,true);
	this.removeEventListener('click',colorCircle);
}

var removeCircle = function(e){
	console.log('remove');
	e.stopPropagation();
	relevantCircleIndex = -1;
	for (i=0;i<relevantCircleIndex.length;i++){
		if (this.id == circleSpace[i].id.toString()){
			relevantCircleIndex=i;
		}
	}


	circleSpace = circleSpace.splice(relevantCircleIndex,1);
	svg.removeChild(this);
	
	idCounter++;
	randX = Math.random()*500;
	randY = Math.random()*500;
	theCircle = newCircle(randX,randY,idCounter);
	theCircle.createCircle(theCircle.x,theCircle.y);
}

document.getElementById("svgElement").addEventListener("click",createCircle);
