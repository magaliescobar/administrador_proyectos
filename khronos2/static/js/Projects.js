function Projects(config) {
	this.config = config;

	this.$container = $(this.config.containerID);
	this.$projectSelected = null;

	this.loadProjects();
	this.attachEvents();
}

Projects.prototype = {
	loadProjects: function() {
		var that = this;
		this.$container.load('/proyectos/', function() {
			that.$projects = $(that.config.containerID).children("tr");
		});
	},

	attachEvents: function() {
		var that = this;

		this.$container.on("click", "tr", function() {
			var $project = $(this);
			if (that.$projectSelected == null || that.$projectSelected[0] != $project[0]) {
				panel.cronometer.hide();
				that.$projectSelected = $project;
				panel.tasks.loadTasks($project.attr('id')); //panel is a global variable
			}
		});
	}
}