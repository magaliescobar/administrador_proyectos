function Tabs(config) {	
	
	this.config = config;
	this.idTabActive = $("#"+this.config.hiddenID).val();

	this.$tabActive = $('#'+this.idTabActive);
	this.$tabActive.addClass(this.config.classActive);	
	this.$tabs = $("#"+this.config.containerID);
	
	this.attachEvents();
}

Tabs.prototype = {
	attachEvents: function() {
		var that = this;

		this.$tabs.on("click", this.config.childrensType, function() { 
			if (that.$tabActive[0] != $(this)[0]){ // si no esta seleccionado
				$(this).addClass(that.config.classActive);
				that.$tabActive.removeClass(that.config.classActive);
				that.$tabActive = $(this);
			}
		});

		this.$tabs.on({
		    mouseenter: function () {
		        $(this).addClass(that.config.classOnMouseOver);
		    },
		    mouseleave: function () {
		        $(this).removeClass(that.config.classOnMouseOver);
		    }
		}, this.config.childrensType);
	}
};

/*
	Examples:

	var tabsBootstrap = new Tabs({
		hiddenID : 'tab-selected', // this is optional, the value coming from server to a hidden
		childrensType : 'li', // type of elements to be clicked.
		containerID : 'nav',
		classActive: 'active',
		classOnMouseOver : 'APS-tab-hover-on'
	});

	var tabsAPS = new Tabs({
		containerID : 'projects_container',
		classActive: 'APS-active-tab',
	});



*/