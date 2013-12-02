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
	tt_horas= models.IntegerField(null=True, blank=True, default=0)
	tt_minutos= models.IntegerField(null=True, blank=True, default=0)
	tt_segundos= models.IntegerField(null=True, blank=True, default=0)
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
	tt_horas= models.IntegerField(null=True, blank=True, default=0)
	tt_minutos= models.IntegerField(null=True, blank=True, default=0)
	tt_segundos= models.IntegerField(null=True, blank=True, default=0)
	fecha_modificacion = models.DateField(null=True, blank=True)

	def __unicode__(self):
		return "%s - %s - %s - %s" %(self.nombre, self.descripcion, self.fecha_inicio, self.estado)

	class Meta():
		verbose_name_plural="Tareas"
	

class Intervalos(models.Model):
	fecha = models.DateField(auto_now_add=True)
	tt_horas= models.IntegerField(null=True, blank=True, default=0)
	tt_minutos= models.IntegerField(null=True, blank=True, default=0)
	tt_segundos= models.IntegerField(null=True, blank=True, default=0)
	descripcion = models.TextField(null=True, blank=True)
	tarea = models.ForeignKey(Tareas)

	def __unicode__(self):
		return "%s - %s - %s" % (self.fecha, self.descripcion, self.tarea)

	class Meta():
		verbose_name_plural="Intervalos"

	def save(self):
		self.tarea.tt_horas += self.tt_horas
		self.tarea.tt_minutos += self.tt_minutos
		if self.tarea.tt_minutos > 59:
			self.tarea.tt_horas += 1
			self.tarea.tt_minutos = self.tarea.tt_minutos % 60
		self.tarea.tt_segundos += self.tt_segundos
		if self.tarea.tt_segundos > 59:
			self.tarea.tt_minutos += 1
			self.tarea.tt_segundos = self.tarea.tt_segundos % 60
		self.tarea.save()

		self.tarea.proyecto.tt_horas += self.tt_horas
		
		self.tarea.proyecto.tt_minutos += self.tt_minutos
		if self.tarea.proyecto.tt_minutos > 59:
			self.tarea.proyecto.tt_horas += 1
			self.tarea.proyecto.tt_minutos = self.tarea.proyecto.tt_minutos % 60
		self.tarea.proyecto.tt_segundos += self.tt_segundos
		if self.tarea.proyecto.tt_segundos > 59:
			self.tarea.proyecto.tt_minutos += 1
			self.tarea.proyecto.tt_segundos = self.tarea.proyecto.tt_segundos % 60
		self.tarea.proyecto.save()
		super(Intervalos, self).save()

class EstadosTareas(models.Model):
	tarea = models.ForeignKey(Tareas)
	fecha = models.DateField()
	descripcion = models.TextField()
	estado = models.CharField(max_length=11, choices=estado_tareas)


	def __unicode__(self):
		return "%s - %s" %(self.tarea, self.fecha)

	class Meta():
		verbose_name_plural="Estados de la Tarea"

