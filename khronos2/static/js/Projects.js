function Projects(config) {
	this.config = config;

	this.$container = $(this.config.containerID);
	this.$project_selected = null;

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
			if (that.$project_selected == null || that.$project_selected[0] != $project[0]) {
				panel.cronometer.hide();
				that.$project_selected = $project;
				panel.tasks.loadTasks($project.attr('id')); //panel is a global variable
			}
		});
	}
}