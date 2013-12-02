function Tasks(config) {
	this.config = config;

	this.$container = $(this.config.containerID);
	this.$invervalsContainer = $(this.config.intervalsContainerID);

	this.$taskSelected = null;
	this.$currentTask = $('#current_task');

	this.attachEvents();
}

Tasks.prototype = {
	loadTasks: function(projectID, taskID) {
		var pID = projectID.split('-')[1];

		this.$container.load('/tareas/' + pID, function() {

			if (projectID && taskID) {
				
				panel.tabsAPSProjects.activeTab($('#' + projectID));
				panel.tabsAPSTasks.activeTab($('#' + taskID));
			} 
		});
	},

	loadIntervals: function(taskID) {
		this.$invervalsContainer.load('/intervalos/' + taskID);
	},

	attachEvents: function() {
		var that = this;

		this.$container.on("click", "tr", function() {
			var $task = $(this);
			if (that.$taskSelected == null || that.$taskSelected[0] != $task[0]) {
				var taskID = $task.attr("id").split('-')[1];
				
				that.$taskSelected = $(this);
				that.changeCurrentTask(that.$taskSelected);
				panel.cronometer.idTask = taskID;
				that.loadIntervals(taskID);
				panel.cronometer.show();
			}
		});
	},

	changeCurrentTask: function($task) {
		this.$currentTask.empty();
		this.$currentTask.text('Current task: ' + $task.children('td').first().text());
	}
}