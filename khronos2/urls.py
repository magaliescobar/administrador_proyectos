from django.conf.urls import patterns, include, url

urlpatterns = patterns('khronos2.views',
    url(r'^save_interval/$', 'save_interval', name='save_interval'),
    url(r'^(?P<id_tarea>\d+)/$', 'cronometro', name='cronometro'),
    url(r'^seleccion/$', 'seleccion', name='seleccion'),
    url(r'^proyectos/$','proyectos', name='proyectos'),
    url(r'^tareas/(?P<id_proyecto>\d+)$', 'tareas', name='tareas'),
)
