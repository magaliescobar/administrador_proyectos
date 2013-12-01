$(function() {
	panel = new Panel();
});

function Panel(config) {
	this.init();
	this.cronometer.hide();
}

Panel.prototype = {
	init: function() {
		this.tabsBootstrap = new Tabs({
			hiddenID : 'tab-selected',
			childrensType : 'li',
			containerID : 'nav',
			classActive: 'active',
		});

		this.tabsAPSProjects = new Tabs({
			childrensType : 'tr',
			containerID : 'proyectos',
			classActive : 'active',
			classOnMouseOver : ''
		});

		this.tabsAPSTasks = new Tabs({
			childrensType : 'tr',
			containerID : 'tareas',
			classActive: 'active',
			classOnMouseOver : ''
		});

		this.cronometer = new Cronometer({
			containerID : "#cronometro",
			hours : "#hours",
			minutes : "#minutes",
			seconds : "#seconds",
			btn_play_id : "#btn_play_id",
			btn_pause_id : "#btn_pause_id",
			btn_stop_id : "#btn_stop_id",
		});

		this.projects = new Projects({
			containerID : '#proyectos',
		});

		this.tasks = new Tasks({
			containerID : '#tareas',
		});
	},
}


