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

def proyectos(request):
	proyectos = Proyectos.objects.all()
	return render(request, 'proyectos.html',
		{
			"proyectos" : proyectos,
		}
	)

def tareas(request, id_proyecto):
	proyecto = get_object_or_404(Proyectos, pk=id_proyecto)
	tareas = proyecto.tareas_set.all() 
	return render(request, 'tareas.html',
		{
			"tareas" : tareas,
		}
	)

def intervalos(request, id_tarea):
	tarea = get_object_or_404(Tareas, pk=id_tarea)
	intervalos = tarea.intervalos_set.all()
	return render(request, 'intervalos.html',
		{
			"intervalos" : intervalos,
		}
	)
	
# end vistas posta

# json 

@csrf_exempt
def save_interval(request):

	hora = int(request.POST['hours'])
	minutos = int(request.POST['minutes'])
	segundos = int(request.POST['seconds'])
	comentarios = request.POST['comments']
	id_tarea = request.POST['idTask']

	tarea = get_object_or_404(Tareas, pk=id_tarea)

	nuevo_intervalo = Intervalos(tt_horas=hora, tt_minutos=minutos, tt_segundos=segundos, 
		descripcion=comentarios, tarea=tarea)
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


def recursos_humanos(request):
	recursos_humanos = serializers.serialize("json" , RecursosHumanos.objects.all())
	return HttpResponse(recursos_humanos)

# end json
