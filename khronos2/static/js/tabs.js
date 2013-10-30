$(function() {
	var tabsBootstrap = new Tabs({
		hiddenID : 'tab-selected',
		childrensType : 'li',
		containerID : 'nav',
		classActive: 'active',
	});

	var tabsAPSProjects = new Tabs({
		childrensType : 'div',
		containerID : 'projects_container',
		classActive : 'label-info APS-active-tab',
		classOnMouseOver : 'APS-tab-hover-on'
	});

	var tabsAPSTasks = new Tabs({
		childrensType : 'div',
		containerID : 'tasks_container',
		classActive: 'label-info APS-active-tab',
		classOnMouseOver : 'APS-tab-hover-on'
	});
});


