import { ServicioReserva } from "../services/ServicioReserva.js";
import { ServicioHabitacion } from "../services/ServicioHabitacion.js";
export class ControladorReserva {
  constructor() {}

  async buscarReserva(request, response) {
    let objetoServicioReserva = new ServicioReserva();
    try {
      response.status(200).json({
        mensaje: "exito en la consulta de reservas",
        datos: await objetoServicioReserva.buscarReservas(),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "error en la consulta " + error,
        datos: null,
      });
    }
  }

  async buscarReservaPorId(request, response) {
    let id = request.params.body;
    let objetoServicioReserva = new ServicioReserva();
    try {
      response.status(200).json({
        mensaje: "Exito en la consulta por Id de reservas" + id,
        datos: await objetoServicioReserva.buscarReservaPorId(id),
      });
    } catch (error) {
      response.status(400).json({
        mensaje: "Sin exito en la consulta por Id de reservas " + error,
        datos: null,
      });
    }
  }

  async agregarReserva(request, response) {
    let datosReserva = request.body;
    let idHabitacionDeseada = datosReserva.idHabitacion;
    let objetoServicioHabitacion = new ServicioHabitacion();
    let objetoServicioReserva = new ServicioReserva();
    try {
      let habitacion = await objetoServicioHabitacion.buscarHabitacionPorId(idHabitacionDeseada);
      let personasTotal=datosReserva.numeroAdultos+datosReserva.numeroNinos

      let dias = (new Date(datosReserva.fechaSalida)- new Date(datosReserva.fechaEntrada))/(1000*3600*24);
      let costoTotalDePersonas = personasTotal * habitacion.valorNoche;
      let totalReserva = dias * costoTotalDePersonas;
      datosReserva.costoReserva=totalReserva
      
      if (idHabitacionDeseada = !null) {
        if (personasTotal > habitacion.numeroMaximoPersonas) {
          response.status(400).json({
            mensaje: "No caben tantas personas, y el costo no puede ser 0",
            datos: null,
          });
        } else {
          response.status(200).json({
            mensaje: "Exito al agregar reserva",
            dato: await objetoServicioReserva.agregarReservaEnBD(datosReserva),
          });
        }
      }
    } catch (error) {
      response.status(400).json({
        mensaje: "Sin exito en la consulta por Id de reservas " + error,
        datos: null,
      });
    }
  }

  async editarReserva(request,response){
    let id = request.params.idReserva
    let datosReserva = request.body
    let objetoServicioReserva = new ServicioReserva();
    try{

        await objetoServicioReserva(id,datosReserva)

        response.status(200).json({
            "mensaje":"exito editando"+id,
            "datos":null,
        })

    }catch(error){

        response.status(400).json({
            "mensaje":"error en la consulta "+error,
            "datos":null,
        })

    }
  }
}
