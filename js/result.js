function Result(grid){
	this.grid=grid;
	this.size=grid.length;
	this.initShapes();
	this.check();
}
Result.prototype.initShapes = function() {
	this.shapes=[
		{
			name: "malý čtverec",
			score: [4],
			involved: 1,
			shape: [
				[0,0],
				[0,0]
			]
		},{
			name: "velký čtverec",
			score: [50],
			involved: 1,
			shape: [
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0]
			]
		},{
			name: "základní spolupráce",
			score: [40, 40],
			involved: 2,
			shape: [
				[0,0,1,1],
				[0,0,1,1],
				[1,1,0,0],
				[1,1,0,0]
			]
		},{
			name: "malá šachovnice",
			score: [25, 25],
			involved: 2,
			shape: [
				[0,1,0],
				[1,0,1],
				[0,1,0]
			]
		},{
			name: "velká šachovnice",
			score: [100, 100],
			involved: 2,
			shape: [
				[0,0,1,1,0,0],
				[0,0,1,1,0,0],
				[1,1,0,0,1,1],
				[1,1,0,0,1,1],
				[0,0,1,1,0,0],
				[0,0,1,1,0,0]
			]
		}
	];
};
Result.prototype.getPt = function(x, y) {
	if(x<0 || y<0 || x>this.size-1 || y>this.size-1)
		return -1000;
	return this.grid[y][x];
};
Result.prototype.check = function() {
	console.clear();
	var pts=[];
	for(var i=0, ii=this.shapes.length;i<ii;i++){
		this.checkShape(this.shapes[i], pts);
	}
	this.pts=pts;
};
Result.prototype.checkShape = function(shape, pts) {
	//console.log(shape.name);
	for(var y0=0;y0<this.size;y0++){
		for(var x0=0;x0<this.size;x0++){
			var players=[];
			var fail=false;
			var multiply=-1;
			for(var y=0;y<shape.shape.length;y++){
				for(var x=0;x<shape.shape[y].length;x++){
					var shapeVal=shape.shape[y][x];
					var realVal=this.getPt(x0+x,y0+y);
					if(realVal==-1000){
						fail=true;
						break;
					}
					if(realVal==-1 && shapeVal==-1)
						continue;
					if(realVal==-1){
						fail=true;
						break;
					}
					if(typeof players[shapeVal]=="undefined"){
						for(key in players){
							if(players[key]==realVal)
								fail=true;
						}
						if(fail)
							break;
						players[shapeVal]=realVal;
					}
					if(players[shapeVal]!=realVal){
						fail=true;
						break;
					}
					if((x0+x==0 || x0+x==this.size-1) && (y0+y==0 || y0+y==this.size-1)){
						multiply=realVal;
					}

				}
				if(fail)
					break;
			}
			if(!fail){
				console.log(shape.name+" @ "+x0+"x"+y0);
				for(var i=0;i<players.length;i++){
					var plId=players[i];
					var score=shape.score[i];
					if(multiply!=-1/* && multiply==plId*/)
						score*=3;
					console.log(game.players[plId].name+": +"+score);
					if(typeof pts[plId]=="undefined")
						pts[plId]=0;
					pts[plId]+=score;
				}
			}
		}
	}
};
