$(function() {
	formProject.init();
});

var formProject = {

	init : function() {
		this.assignments();

		this.$projectFormWrapper.hide();
		this.$btnCloseProjectForm.hide();

		this.bindUIActions();
	
	},

	assignments : function() {
		this.$projectFormWrapper = $('#project_form_wrapper');
		this.$projectsContainer = $('#projects_container');

		this.$nombre = $('#nombre');
		this.$descripcion = $('#descripcion');
		this.$fechaInicio = $('#fecha_inicio');
		this.$estado = $('#estado');

		this.$btnShowProjectForm = $('#btn_show_project_form');
		this.$btnCloseProjectForm = $('#btn_close_project_form');
		this.$btnAddProject = $('#btn_add_project');
	},

	bindUIActions : function() {
		formProject.$btnShowProjectForm.click(function() {
			formProject.$projectFormWrapper.fadeIn();
			formProject.$btnCloseProjectForm.fadeIn();
		});

		formProject.$btnCloseProjectForm.click(function() {
			formProject.$projectFormWrapper.fadeOut();
			formProject.$btnCloseProjectForm.fadeOut();
			formProject.clear();
		});

		formProject.$btnAddProject.click(function() {
			if(formProject.isValid()) {
				formProject.save();
			} else {
				return false;
			}
		});
	},

	isValid : function() {
		// esto hay que hacerlo mejor, tengo una pachorra nomas ahora xD

		if (!formProject.$nombre.val()
		|| !formProject.$descripcion.val()
		|| !formProject.$fechaInicio.val()) {
			alert("completa todo wachin o cerralo.");
			return false;
		} else {
			return true;
		}
	},

	save : function() {

		$.post("/save_proyecto/", {
			nombre : formProject.$nombre.val(),
			descripcion : formProject.$descripcion.val(),
			fecha_inicio : formProject.$fechaInicio.val(),
			estado : formProject.$estado.val(),
		},
		function(projectAdded) {

			$('<div>', {
				id: projectAdded.id,
				text: projectAdded.nombre.capitalize()
			})
			.click(panel.projectClicked)
			.appendTo(formProject.$projectsContainer);

			formProject.clear();
			formProject.$projectFormWrapper.fadeOut();
		}, "json");
	},

	clear : function() {
		formProject.$nombre.val('');
		formProject.$descripcion.val('');
		formProject.$fechaInicio.val('');
	}
};