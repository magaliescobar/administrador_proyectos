$(function() {
	seleccion.init();
});

var seleccion = {
	config: {

	},

	init: function(config) {
		$.extend(seleccion.config, config);

		this.$projects_container = $('#projects_container');
		this.$projects = this.$projects_container.children("div");
		
		this.$tasks_container = $('#tasks_container');
		this.$tasks = null;
		this.$tasks_container.hide();

		seleccion.bindUIActions();
	},

	bindUIActions: function() {
		seleccion.$projects.click(function() {
			var id_proyecto = $(this).attr("id");

			seleccion.getTasks(id_proyecto);
			
			seleccion.$projects_container.hide();
			seleccion.$tasks_container.show();
		});
	},

	getTasks: function(id_proyecto) {
		$.getJSON("/cron/tareas/" + id_proyecto, function(tareas) {
			
			for(var i in tareas) {
				
				var div = $("<div>", {
					id: tareas[i].pk,
					text: tareas[i].fields.nombre,
				})
				.click(function() {
					window.location.href = "/cron/" + tareas[i].pk;
				});

				div.appendTo(seleccion.$tasks_container);

			}
		});
	}
}