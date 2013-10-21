from django.conf.urls import patterns, include, url

urlpatterns = patterns('khronos2.views',
    url(r'^$', 'panel', name='panel'),
    
    url(r'^save_interval/$', 'save_interval', name='save_interval'),
    url(r'^proyectos/$','proyectos', name='proyectos'),
    url(r'^tareas/(?P<id_proyecto>\d+)$', 'tareas', name='tareas'),
)
