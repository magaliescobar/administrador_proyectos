function Tasks(config) {
	this.config = config;

	this.$container = $(this.config.containerID);
	this.$task_selected = null;
	this.$current_task = $('#current_task');

	this.attachEvents();
}

Tasks.prototype = {
	loadTasks: function(projectID, $project_selected, $task_selected) {
		var id = projectID.split('-')[1];

		if ($project_selected && $task_selected) {
			var $ps = $project_selected,
				$ts = $task_selected;
		}
		this.$container.load('/tareas/' + id, function() {

			if ($ps && $ts) {
				panel.tabsAPSProjects.activeTab($('#' + $ps.attr('id')));
				panel.tabsAPSTasks.activeTab($('#' + $ts.attr('id')));
			} 
		});
	},

	attachEvents: function() {
		var that = this;

		this.$container.on("click", "tr", function() {
			var $task = $(this);
			if (that.$task_selected == null || that.$task_selected[0] != $task[0]) {
				that.$task_selected = $(this);
				that.changeCurrentTask(that.$task_selected);
				panel.cronometer.idTask = $task.attr("id").split('-')[1];
				panel.cronometer.show();
			}
		});
	},

	changeCurrentTask: function($task) {
		this.$current_task.empty();
		this.$current_task.text('Current task: ' + $task.children('td').first().text());
	}
}