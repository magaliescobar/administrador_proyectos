$(function() {
	panel.init();
});

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
		panel.$projects.click(function() {

			panel.$cron.hide();
			panel.$tasks_wrapper.show();
			
			if (panel.$projectSelectedID !== $(this).attr("id")) {
			
				panel.$tasks_container.empty();
				panel.$projectSelectedID = $(this).attr("id");
				panel.$projectSelected = $(this);
				var id_proyecto = $(this).attr("id");
				
				panel.getTasks(id_proyecto);
			}

		});
	},

	getTasks: function(id_proyecto) {
		$.getJSON("/tareas/" + id_proyecto, function(tareas) {
			
			for(var i in tareas) {
				
				var div = $("<div>", {
					id: tareas[i].pk,
					text: tareas[i].fields.nombre,
				})
				.click(function() {
					// display timer
					panel.$cron.show();
					$("#idTarea").val(tareas[i].pk);
				});

				div.appendTo(panel.$tasks_container);

			}
		});
	}
}