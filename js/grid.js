function Grid(size, parent){
	this.parent=parent;
	this.lastSelected=0;
	this.size=size;
	this.history=[];
}
Grid.prototype.bindGrid=function(){
	var me=this;
	[].forEach.call($(".board tr td"), function(o){
		o.data=me;
	});
	$(".board tr td").bind("contextmenu", function(e){
		e.preventDefault();
	}).bind("mouseup", function(e){
		var colorId;
		if(e.button==2){
			this.player=-1;
			$(this).css({
				backgroundColor: "transparent"
			});
			new Result(game.grid.readGrid());
			return false;
		}else{
			if(typeof this.player=="undefined" || parseInt(this.player)==-1){
				colorId=game.grid.lastSelected;
			}else{
				colorId=game.grid.lastSelected=(this.player+1)%game.players.length;
			}
			this.player=game.grid.lastSelected=colorId;
			$(this).css({
				backgroundColor: game.players[colorId].color
			});
		}
		res=new Result(game.grid.readGrid());
	});
	$(window).resize(function(){
		var s=Math.min($(this).height(), $(this).width());
		$(".boardWrap").css({
			width:s+"px",
			height:s+"px"
		});
	}).trigger("resize");
};
Grid.prototype.bindClickables=function(){
	this.bindGrid();
	$(".result button").click(function(){
		t.begin("time");
		var res=new Result(game.grid.readGrid());
		t.end("time");
		var pts=res.pts;
		var cnt=$(".result table tr").length;
		var str="<tr><td>"+(cnt==0 ? 1 : cnt)+".";
		for(var i=0;i<game.players.length;i++){
			var score=(typeof pts[i]=="undefined" ? 0 : pts[i]);
			str+="<td>"+score;
		}
		$(".result table").append(str);
		if(!cnt){
			str="<tr><td>#"
			for(var i=0;i<game.players.length;i++){
				str+="<td><div>";
			}
			$(".result table").prepend(str).find("tr").first().find("td div").each(function(n){
				$(this).css({
					backgroundColor: game.players[n].color
				});
			});
		}
	});
};
Grid.prototype.drawBoard=function(){
	$(".board").empty();
	for(var y=0;y<this.size;y++)
		$(".board").append("<tr>");
	for(var x=0;x<this.size;x++)
		$(".board tr").append("<td>");
	$(".board tr td").append("<div>");


	$(".legendPlayers table").empty();
	$(".result").empty().append("<table></table><button>Do the magic!</button>");
};
Grid.prototype.readGrid = function() {
	var res=[];
	var trs=$(".board tr");
	[].forEach.call(trs, function(tr){
		var subres=[];
		var tds=$(tr).find("td");
		[].forEach.call(tds, function(td){
			subres.push(typeof td.player=="undefined" ? -1 : td.player);
		});
		res.push(subres);
	});
	return res;
};