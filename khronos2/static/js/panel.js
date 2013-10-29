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
				.click(function() {
					// display timer
					panel.$cron.fadeIn();
					Cron.idTarea = tareas[i].pk;
				})
				.appendTo(panel.$tasks_container);
			}
			
		});
	},

	projectClicked: function() {
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