from django.http import HttpResponse, HttpResponseRedirect as redirect
from django.shortcuts import render, get_object_or_404
from models import Intervalos, Proyectos, Tareas, RecursosHumanos
from django.core import serializers
from django.utils import simplejson
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt

# vistas

def panel(request):
	return render(request,"panel.html",
		{
			"proyectos": Proyectos.objects.all(),
			"tab_selected" : "panel",
		}
	)

def about(request):
	return render(request, "about.html",
		{
			"tab_selected" : "about",
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

	tarea = get_object_or_404(Tareas, pk=id_tarea)

	tiempo = str(hora) + ":" +str(minutos) + ":" + str(segundos)

	nuevo_intervalo = Intervalos(tiempo=tiempo, descripcion=comentarios, tarea=tarea)
	nuevo_intervalo.save()

	return HttpResponse("Intervalo Guardado")

@csrf_exempt
def save_proyecto(request):

	nombre = request.POST['nombre']
	descripcion = request.POST['descripcion']
	fecha_inicio = request.POST['fecha_inicio']
	estado = request.POST['estado']

	nuevo_proyecto = Proyectos(
		nombre=nombre,
		descripcion=descripcion,
		fecha_inicio=fecha_inicio,
		estado=estado
	)
	nuevo_proyecto.save()

	return HttpResponse(simplejson.dumps({
		"id" : nuevo_proyecto.id,
		"nombre" : nombre,
	}))

@csrf_exempt
def save_tarea(request):

	print request.POST

	proyecto_id = request.POST['proyecto_id']
	nombre = request.POST['nombre']
	descripcion = request.POST['descripcion']
	responsable_id = request.POST['responsable']
	fecha_inicio = request.POST['fecha_inicio']
	tiempo_estimado = request.POST['tiempo_estimado']
	estado = request.POST['estado']

	proyecto = get_object_or_404(Proyectos, pk=proyecto_id)
	rrhh = get_object_or_404(RecursosHumanos, pk=responsable_id)

	nueva_tarea = Tareas(
		proyecto=proyecto,
		nombre=nombre,
		descripcion=descripcion,
		responsable=rrhh,
		fecha_inicio=fecha_inicio,
		tiempo_estimado=tiempo_estimado,
		estado=estado
	)
	nueva_tarea.save()

	return HttpResponse(simplejson.dumps({
		"id": nueva_tarea.id,
		"nombre": nombre
	}))

def proyectos(request):
	proyectos = serializers.serialize("json" , Proyectos.objects.all())
	return HttpResponse(proyectos)

def tareas(request, id_proyecto):
	proyecto = get_object_or_404(Proyectos, pk=id_proyecto)
	t = proyecto.tareas_set.all() 

	tareas = serializers.serialize("json" ,t) 
	return HttpResponse(tareas)

def recursos_humanos(request):
	recursos_humanos = serializers.serialize("json" , RecursosHumanos.objects.all())
	return HttpResponse(recursos_humanos)

# end json
