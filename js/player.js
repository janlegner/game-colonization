function Player(name, color){
	this.name=name;
	this.color=color;

	$(".legendPlayers table").append(""
		+"<tr>"
		+	"<td><div>"
		+	"<td>"+this.name
	).find("tr").last().find("div").css({
		backgroundColor: this.color
	});
}