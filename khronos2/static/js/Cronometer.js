function Cronometer(config) {

	this.config = config;
	
	this.$container = $(this.config.containerID);

	this.idTask = null;
	
	this.$hours = $(this.config.hours);
	this.$minutes = $(this.config.minutes);
	this.$seconds = $(this.config.seconds);
	this.$btn_play = $(this.config.btn_play_id);
	this.$btn_pause = $(this.config.btn_pause_id);
	this.$btn_stop = $(this.config.btn_stop_id);

	this.clock = null;
	this.isRunning = false;

	this.hours = 0;
	this.minutes = 0;
	this.seconds = 0;

	this.attachEvents();	
}

Cronometer.prototype = {
	attachEvents: function() {
		var that = this;
		
		this.$btn_play.click(function() {
			if (!that.isRunning) {	
				that.isRunning = true;

				that.clock = setInterval(function(){
					that.hours = parseInt(that.$hours.text());
					that.minutes = parseInt(that.$minutes.text());
					that.seconds = parseInt(that.$seconds.text());

					that.seconds++;

					if (that.seconds > 59) {

						that.seconds = 0;
						that.minutes++;

						if (that.minutes > 59) {
							that.minutes = 0;
							that.hours++;
						}
					}

					that.$seconds.text(that.seconds);
					that.$minutes.text(that.minutes);
					that.$hours.text(that.hours);
				},1000);
			}
		});

		this.$btn_pause.click(function() {
			if (that.isRunning){
				that.isRunning = false;
				clearInterval(that.clock);
			}
		});
		
		this.$btn_stop.click(function() {
			if (that.isRunning){
				that.isRunning = false;
				clearInterval(that.clock);
				that.saveInterval();
			}
			// deberia hacer saveInterval();
		});
	},

	show: function() {
		this.$container.show();
	},

	hide: function() {
		this.$container.hide();
	},

	clear: function() {
		this.hours = 0;
        this.$hours.text('0');

        this.minutes = 0;
        this.$minutes.text('0');

        this.seconds = 0;
        this.$seconds.text('0');
	},

	saveInterval: function() {

		var that = this;

		$.ajax({
		    url : "/save_interval/",
		    type: "POST",
		    data : {
		    	hours : this.hours,
				minutes : this.minutes,
				seconds : this.seconds,
				comments : "el coment generic",
				idTask : this.idTask,
		    },
		    success: function(data, textStatus, jqXHR)
		    {
		    	that.clear();

		        panel.projects.loadProjects();
		        panel.tasks.loadTasks(
		        	panel.projects.$project_selected.attr('id'),
		        	panel.projects.$project_selected, 
		        	panel.tasks.$task_selected
		        );

		        // panel.tabsAPSProjects.activeTab(panel.projects.$project_selected);
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		 
		    }
		});
		
	}
}

