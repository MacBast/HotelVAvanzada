import { modeloReserva } from "../Models/ModeloReserva.js";

export class ServicioReserva {
    async buscarReservas() {
        let reserva = await modeloReserva.find();
        return reserva;
    }

    async buscarReservaPorId(id) {
        let reserva = await modeloReserva.findById(id);
        return reserva;
    }

    async agregarReservaEnBD(datos) { //POST
        let datosReserva = new modeloReserva(datos);
        return await datosReserva.save();
    }

    async editarReserva(id, datos) {
        return await modeloReserva.findByIdAndUpdate(id, datos);
    }
}