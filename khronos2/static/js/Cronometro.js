$(function() {
	Cron.init();
});

var Cron = {
	
	config: {
		hours : 0,
		minutes: 0,
		seconds: 0,
		wrapper: '#Cron',
		container: 'div',
		urlBase: '',
	},

	init: function(config) {
		$.extend(Cron.config, config);

		this.hours = 0;
		this.$hours = $('#hours');
		this.$hours.text(Cron.config.hours);

		this.minutes = 0;
		this.$minutes = $('#minutes');
		this.$minutes.text(Cron.config.minutes);

		this.seconds = 0;
		this.$seconds = $('#seconds');
		this.$seconds.text(Cron.config.seconds);

		this.cron = null;

		this.$btn_play = $('#btn_play');
		
		this.$btn_pause = $('#btn_pause');
		Cron.disableEle(this.$btn_pause);

		this.$btn_stop = $('#btn_stop');
		Cron.disableEle(this.$btn_stop);

		this.$desc = $('#desc');
		this.$desc.hide();

		this.$btn_send = $('#btn_send');
		this.$btn_send.hide();

		this.idTarea = null;

		this.bindUIActions();
	},

	bindUIActions: function() {
		this.$btn_play.click(this.play);
		this.$btn_pause.click(this.pause);
		this.$btn_stop.click(this.stop);


		Cron.$btn_send.click(function() {

			$.post("/save_interval/", {
				hours: Cron.hours,
				minutes: Cron.minutes,
				seconds: Cron.seconds,
				comments: Cron.$desc.val(),
				idTarea : Cron.idTarea,
			}, function(msj) {
				console.log(msj);
				
				clearInterval(Cron.cron);
				Cron.cleaTimer();

				Cron.enableEle(Cron.$btn_play);
				Cron.enableEle(Cron.$btn_pause);

				Cron.hideForm();
				Cron.clearForm();

				Cron.disableEle(Cron.$btn_pause);
				Cron.disableEle(Cron.$btn_stop);
			});

		});	
	},

	hideForm: function() {
		Cron.hideEle(Cron.$desc);
		Cron.hideEle(Cron.$btn_send);

	},

	clearForm: function() {
		Cron.$desc.val('');
	},

	play: function() {

		Cron.enableEle(Cron.$btn_stop);
		
		Cron.cron = setInterval(function(){
			Cron.seconds = parseInt(Cron.$seconds.text());
			Cron.minutes = parseInt(Cron.$minutes.text());
			Cron.hours = parseInt(Cron.$hours.text());

			Cron.seconds++;

			if (Cron.seconds > 59) {

				Cron.seconds = 0;
				Cron.minutes++;

				if (Cron.minutes > 59) {

					Cron.minutes = 0;
					Cron.hours++;

				}

			}

			Cron.$seconds.text(Cron.seconds);
			Cron.$minutes.text(Cron.minutes);
			Cron.$hours.text(Cron.hours);
		},1000);

		Cron.disableEle(Cron.$btn_play);

		Cron.enableEle(Cron.$btn_pause);
	},

	pause: function() {
		clearInterval(Cron.cron);

		Cron.disableEle(Cron.$btn_pause);

		Cron.enableEle(Cron.$btn_play);
	},

	stop: function() {
		clearInterval(Cron.cron);

		Cron.showEle(Cron.$desc);
		Cron.showEle(Cron.$btn_send);

		Cron.disableEle(Cron.$btn_pause);
		Cron.disableEle(Cron.$btn_play);
		
	},

	cleaTimer: function() {
		this.hours = 0;
		this.$hours.text('0');

		this.minutes = 0;
		this.$minutes.text('0');

		this.seconds = 0;
		this.$seconds.text('0');
	},

	enableEle: function($ele) {
		$ele.removeAttr("disabled");
	},

	disableEle: function($ele) {
		$ele.attr("disabled", "disabled");
	},

	showEle: function($ele) {
		$ele.show();
	},

	hideEle: function($ele) {
		$ele.hide();
	}
}