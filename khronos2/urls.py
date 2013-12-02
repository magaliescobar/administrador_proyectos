from django.conf.urls import patterns, include, url

urlpatterns = patterns('khronos2.views',
    url(r'^$', 'panel', name='panel'),
    url(r'^about/$', 'about', name='about'),
    
    url(r'^save_interval/$', 'save_interval', name='save_interval'),
    url(r'^save_proyecto/$', 'save_proyecto', name='save_proyecto'),
    url(r'^save_tarea/$', 'save_tarea', name='save_tarea'),

    url(r'^proyectos/$','proyectos', name='proyectos'),
    url(r'^tareas/(?P<id_proyecto>\d+)$', 'tareas', name='tareas'),
    url(r'^intervalos/(?P<id_tarea>\d+)$', 'intervalos', name='intervalos'),
    url(r'^recursos_humanos/$', 'recursos_humanos', name='recursos_humanos'),
)
