$(function() {
	panel.init();
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function clone(object) {
	function F() {}
	F.prototype = object;
	return new F;
}

var panel = {
	config: {

	},

	init: function(config) {
		$.extend(panel.config, config);

		this.$projects_container = $('#projects_container');
		this.$projects = this.$projects_container.children("div");
		this.projectSelectedID = null;
		this.$projectSelected = null;
		
		this.$tasks_wrapper = $('#tasks_wrapper');
		this.$tasks_container = $('#tasks_container');
		this.$tasks = null;
		this.$tasks_wrapper.hide();

		this.$currentTaskWrapper = $('#current-task-wrapper');
		this.$currentTask = $('#current-task');

		this.$cron = $('#cron');
		this.$cron.hide();

		panel.bindUIActions();
	},

	bindUIActions: function() {
		panel.$projects.click(panel.projectClicked);
	},

	getTasks: function(id_proyecto) {
		$.getJSON("/tareas/" + id_proyecto, function(tareas) {

			for(var i in tareas) {
				
				$("<div>", {
					id: tareas[i].pk,
					text: tareas[i].fields.nombre,
				})
				.append(
					$('<span>', {
						text: tareas[i].fields.tt_horas + ":" 
						+ tareas[i].fields.tt_minutos + ":"
						+ tareas[i].fields.tt_segundos
					}).attr('class', 'badge pull-right')
				)
				.click(function() {
					// display timer
					panel.$cron.fadeIn();
					if (!Cron.isRunning) {
						panel.$currentTask.text("Current Task: " + $(this).text());
						Cron.idTarea = $(this).attr('id');
					}
				})
				.appendTo(panel.$tasks_container);
			}
			
		});
	},

	projectClicked: function() {
		if (!Cron.isRunning) {
			panel.$cron.fadeOut();
			panel.$tasks_wrapper.fadeIn();
			
			if (panel.$projectSelectedID !== $(this).attr("id")) {
			
				panel.$tasks_container.empty();
				panel.$projectSelectedID = $(this).attr("id");
				panel.$projectSelected = $(this);
				var id_proyecto = $(this).attr("id");

				formTask.idProyecto = id_proyecto; // para saber de que proyecto estoy hablando.
				
				panel.getTasks(id_proyecto);
			}
		}		
	}
}