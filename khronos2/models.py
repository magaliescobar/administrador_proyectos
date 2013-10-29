from django.db import models


estado_proyecto = (
	("no_iniciado" , "No iniciado"),
	("en_proceso" , "En proceso"),
	("suspendido" , "Suspendido"),
	("finalizado" , "Finalizado"),
)


estado_tareas = (
	("no_iniciada" , "No iniciada"),
	("en_proceso" , "En proceso"),
	("suspendida" , "Suspendida"),
	("para_testear" , "Para Testear"),
	("para_retome" , "Para Retome"),
	("finalizada" , "Finalizada"),
)

roles = (
	("desarrollador" , "Desarrollador"),
	("testing" , "Testing"),
	("lider_proyecto" , "Lider de Proyecto"),
)

class RecursosHumanos(models.Model):
	nombre = models.CharField(max_length=30)
	email = models.EmailField()
	rol = models.CharField(max_length=15, choices=roles) 

	def __unicode__(self):
		return "%s - %s - %s" %(self.nombre, self.email, self.rol)

	class Meta():
		verbose_name_plural="Recursos Humanos"


class Proyectos(models.Model):
	nombre = models.CharField(max_length=30)
	descripcion = models.TextField()
	fecha_inicio = models.DateField()
	fecha_fin = models.DateField(null=True, blank=True)
	tiempo_total = models.TimeField(null=True, blank=True)
	estado = models.CharField(max_length=11, choices=estado_proyecto)

	def __unicode__(self):
		return "%s - %s - %s - %s" %(self.nombre, self.descripcion, self.fecha_inicio, self.estado)

	class Meta():
		verbose_name_plural="Proyectos"
	

class Tareas(models.Model):
	proyecto = models.ForeignKey(Proyectos)
	responsable = models.ForeignKey(RecursosHumanos)
	nombre = models.CharField(max_length=30)
	descripcion = models.TextField()
	fecha_inicio = models.DateField()
	fecha_fin = models.DateField(null=True, blank=True)
	tiempo_estimado = models.IntegerField() 
	estado = models.CharField(max_length=11, choices=estado_tareas)
	tiempo_total= models.TimeField(null=True, blank=True)
	fecha_modificacion = models.DateField(null=True, blank=True)

	def __unicode__(self):
		return "%s - %s - %s - %s" %(self.nombre, self.descripcion, self.fecha_inicio, self.estado)

	class Meta():
		verbose_name_plural="Tareas"
	

class Intervalos(models.Model):
	fecha = models.DateField(auto_now_add=True)
	tiempo = models.TimeField()
	descripcion = models.TextField(null=True, blank=True)
	tarea = models.ForeignKey(Tareas)

	def __unicode__(self):
		return "%s - %s - %s - %s" % (self.fecha, self.tiempo, self.descripcion, self.tarea)

	class Meta():
		verbose_name_plural="Intervalos"

class EstadosTareas(models.Model):
	tarea = models.ForeignKey(Tareas)
	fecha = models.DateField()
	descripcion = models.TextField()
	estado = models.CharField(max_length=11, choices=estado_tareas)


	def __unicode__(self):
		return "%s - %s" %(self.tarea, self.fecha)

	class Meta():
		verbose_name_plural="Estados de la Tarea"

