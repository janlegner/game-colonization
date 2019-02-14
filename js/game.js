var game;
function Game(size){
	this.grid=null;
	this.size=size;
	this.players=[];
	this.init();
}
Game.prototype.init = function() {
	t.begin("init");

	this.grid=new Grid(this.size, this);

	this.grid.drawBoard();
	this.grid.bindClickables();

	t.end("init");
};
Game.prototype.reset = function() {
	this.init();
};
