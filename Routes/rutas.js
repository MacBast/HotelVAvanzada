//ESTE ARCHIVO ESTABLECE LAS RUTAS O ENDPOINTS DE CADA SERVICIO OFRECIDO POR MI API
import express from 'express'

import { ControladorHabitacion } from '../Controllers/ControladorHabitacion.js'
import {ControladorReserva} from '../Controllers/ControladorReservas.js'
let controladorHabitacion=new ControladorHabitacion(); //usando el controlador
let controladorReserva = new ControladorReserva();

export let rutasPersonalizadas=express.Router()

rutasPersonalizadas.get('/hotelesnick/habitaciones',controladorHabitacion.buscarHabitaciones)
rutasPersonalizadas.get('/hotelesnick/habitacion/:idHabitacion',controladorHabitacion.buscarHabitacionPorId)
rutasPersonalizadas.post('/hotelesnick/habitacion',controladorHabitacion.registrarHabitacion)
rutasPersonalizadas.put('/hotelesnick/habitacion/:idHabitacion',controladorHabitacion.editarHabitacion)

rutasPersonalizadas.get("/hotelesnick/reservas",controladorReserva.buscarReserva);
rutasPersonalizadas.get("/hotelesnick/reserva/:idReserva",controladorReserva.buscarReservaPorId);
rutasPersonalizadas.post("/hotelesnick/reserva",  controladorReserva.agregarReserva);
rutasPersonalizadas.put(  "/hotelesnick/habitacion/:idHabitacion",  controladorReserva.editarReserva);