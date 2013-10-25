from django.http import HttpResponse, HttpResponseRedirect as redirect
from django.shortcuts import render
from models import Intervalos, Proyectos, Tareas
from django.core import serializers
from django.utils import simplejson
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt

# vistas

def panel(request):
	return render(request,"panel.html",
		{
			"proyectos": Proyectos.objects.all()
		}
	)

# end vistas posta

# json 

@csrf_exempt
def save_interval(request):

	hora = request.POST['hours']
	minutos = request.POST['minutes']
	segundos = request.POST['seconds']
	comentarios = request.POST['comments']
	id_tarea = request.POST['idTarea']

	tarea = Tareas.objects.get(id=id_tarea)

	tiempo = str(hora) + ":" +str(minutos) + ":" + str(segundos)

	nuevo_intervalo = Intervalos(tiempo=tiempo, descripcion=comentarios, tarea=tarea)
	nuevo_intervalo.save()

	return HttpResponse("Intervalo Guardado")

@csrf_exempt
def save_proyecto(request):

	nombre = request.POST['nombre']
	descripcion = request.POST['descripcion']
	fecha_inicio = request.POST['fecha_inicio']
	fecha_fin = request.POST['fecha_fin']
	estado = request.POST['estado']

	nuevo_proyecto = Proyectos(
		nombre=nombre,
		descripcion=descripcion,
		fecha_inicio=fecha_inicio,
		fecha_fin=fecha_fin,
		estado=estado
	)
	nuevo_proyecto.save()

	return_nuevo_proyecto = {
		"id" : nuevo_proyecto.id,
		"nombre" : nombre,
	}

	return HttpResponse(simplejson.dumps(return_nuevo_proyecto))

def proyectos(request):
	proyectos = serializers.serialize("json" , Proyectos.objects.all())
	return HttpResponse(proyectos)

def tareas(request, id_proyecto):
	proyecto = Proyectos.objects.get(id=id_proyecto)
	t = proyecto.tareas_set.all() 

	tareas = serializers.serialize("json" ,t) 
	return HttpResponse(tareas)


# end json
