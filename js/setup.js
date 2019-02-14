var setup;
function Setup(){
	this.defVals();
}
Setup.prototype.addTeam = function() {
	var newTr=$(".setup table").append(""
		+"<tr class=players>"
		+	"<td>"
		+		"<input type=text maxlength=30 class=name value='"+setup.getDef("name")+"''>"
		+	"<td>"
		+		"<div class=showcase></div>"
		+		"<input type=text class=color value='"+setup.getDef("color")+"''>"
		+		"<div class=close>odebrat</div>"
	).find("tr").last();
	newTr.find(".color").bind("keyup", function(){
		$(this).prev().css({
			backgroundColor: "black"
		});
		$(this).prev().css({
			backgroundColor: $(this).val()
		});
	}).trigger("keyup");
	newTr.find(".close").click(function(){
		$(this).parent().parent().remove();
	});
};
Setup.prototype.defVals = function() {
	this.defCols=["red", "blue", "yellow", "green", "pink", "black"];
	this.defNames=["tým1", "tým2", "tým3", "tým4", "tým5", "tým6"];
};
Setup.prototype.getDef = function(str) {
	if(str=="color")
		return this.defCols.shift();
	return this.defNames.shift();
};
Setup.prototype.setup = function() {
	$(".setup").show();
	$(".setup .body").empty().append(""
		+"<table>"
		+	"<tr><td>Velikost mřížky:<td><input type=text class=gridSize value=20 maxlength=2>"
		+	"<tr><td colspan=2><div class=add>přidat tým</div>"
		+	"<tr><td>Název týmu<td>Barva"
		+"</table>"
		+"<br><button>Začít novou hru</button><button>Načíst poslední uloženou hru</button>"
	).find(".add").click(function(){
		setup.addTeam();
	}).trigger("click");

	$(".setup button").eq(0).click(function(){
		var size=parseInt($(".setup .gridSize").val());
		if(size<=0){
			window.alert("Zadej velikost hracího pole!");
			return;
		}
		var players=$(".setup .players");

		game=new Game(size);
		[].forEach.call(players, function(player){
			var name=$(player).find(".name").val().trim();
			var color=$(player).find(".color").val().trim();
			if(name.length && color.length)
				game.players.push(new Player(name, color));
		});
		if(game.players.length<2){
			window.alert("Zadej alespoň 2 hráče!");
			return;
		}
		$(".setup").fadeOut();
	});
	$(".setup button").eq(1).click(function(){
		setup.import(JSON.parse(localStorage.getItem("basket-data")));
	});
	$("legendPlayers button").click(function(){
		var arr;
	});
	$(".legendPlayers button").eq(0).click(function(){
		localStorage.setItem("basket-data", JSON.stringify(setup.export()));
	});
};
Setup.prototype.export = function() {
	var exp={};
	exp.size=game.grid.size;
	exp.players=[];
	[].forEach.call(game.players, function(player){
		exp.players.push({
			name: player.name,
			color: player.color,
		});
	});
	exp.grid=[];
	for(var y=0;y<exp.size;y++){
		var row=[];
		for(var x=0;x<exp.size;x++){
			var o=$(".board").find("tr").eq(y).find("td").eq(x);
			if(o.attr("player")==null)
				row.push(-1);
			else
				row.push(parseInt(o.attr("player")));
		}
		exp.grid.push(row);
	}
	return exp;
};
Setup.prototype.import = function(imp) {
	game=new Game(imp.size);
	[].forEach.call(imp.players, function(player){
		game.players.push(new Player(player.name, player.color));
	});
	for(var y=0;y<imp.size;y++){
		for(var x=0;x<imp.size;x++){
			var o=$(".board").find("tr").eq(y).find("td").eq(x);
			var val=imp.grid[y][x];
			o[0].player=val;
			if(val!=-1)
				o.css({
					backgroundColor: imp.players[val].color
				});
		}
	}
	game.grid.lastSelected=0;
	$(".setup").fadeOut();
};
$(document).ready(function(){
	(setup=new Setup()).setup();
});
