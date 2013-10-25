$(function() {
	formTask.init();
});

var formTask = {
	
	init: function() {
		this.idProyecto = null;
		this.responsables = [];

		this.$taskFormWrapper = $('#task_form_wrapper');
		this.$taskFormWrapper.hide();
		this.$tasksContainer = $('#tasks_container');

		this.$nombre = $('#task_nombre');
		this.$descripcion = $('#task_descripcion');
		this.$responsable = $('#task_responsable');
		this.$fechaInicio = $('#task_fecha_inicio');
		this.$fechaFin = $('#task_fecha_fin');
		this.$tiempoEstimado = $('#task_tiempo_estimado');
		this.$estado = $('#task_estado');

		this.$btnShowPTaskForm = $('#btn_show_task_form');
		this.$btnCloseTaskForm = $('#btn_close_task_form');
		this.$btnCloseTaskForm.hide();
		this.$btnAddTask = $('#btn_add_task');

		this.bindUIActions();
		this.getResponsables();
	},

	bindUIActions: function() {
		formTask.$btnShowPTaskForm.click(formTask.show)
		formTask.$btnCloseTaskForm.click(formTask.close);
		formTask.$btnAddTask.click(function() {
			if(formTask.isValid()) {
				formTask.save();
			} else {
				return false;
			}
		});
	},

	getResponsables: function() {
		$.getJSON("/recursos_humanos/", function(RRHH) {
			
			$.each(RRHH, function (i, item) {
			    formTask.$responsable.append($('<option>', { 
			        value: item.pk,
			        text : item.fields.nombre 
			    }));
			    formTask.responsables.push(item);
			});
		})
	},

	show: function() {
		formTask.$taskFormWrapper.show();
		formTask.$btnCloseTaskForm.show();
	},

	clear: function() {
		formTask.$nombre.val('');
		formTask.$descripcion.val('');
		formTask.$fechaInicio.val('');
		formTask.$fechaFin.val('');
		formTask.$tiempoEstimado.val('')
	},

	close: function() {
		formTask.$taskFormWrapper.hide();
		formTask.clear();

		formTask.$btnCloseTaskForm.hide();
	},

	isValid: function() {
		// esto hay que hacerlo mejor, tengo una pachorra nomas ahora xD

		if (!formTask.$nombre.val()
		|| !formTask.$descripcion.val()
		|| !formTask.$fechaInicio.val()
		|| !formTask.$fechaFin.val()
		|| !formTask.$tiempoEstimado.val()) {
			alert("completa todo wachin o cerralo.");
			return false;
		} else {
			return true;
		}
	},

	save: function() {
		$.post("/save_tarea/", {
			proyecto_id : formTask.idProyecto,
			nombre : formTask.$nombre.val(),
			descripcion : formTask.$descripcion.val(),
			responsable : formTask.$responsable.val(),
			fecha_inicio : formTask.$fechaInicio.val(),
			fecha_fin : formTask.$fechaFin.val(),
			tiempo_estimado : formTask.$tiempoEstimado.val(),
			estado : formTask.$estado.val(),
		},
		function(taskAdded) {

			$('<div>', {
				id: taskAdded.id,
				text: taskAdded.nombre
			})
			.appendTo(formTask.$tasksContainer);

			formTask.clear();
		}, "json");
	},

}