package umg.seccionA.proyecto2026.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import umg.seccionA.proyecto2026.entity.Reserva;
import umg.seccionA.proyecto2026.repository.ReservaRepositoty;

@RestController
@RequestMapping("/reserva")
@CrossOrigin
public class ReservaService {
	@Autowired
	ReservaRepositoty rr;

	@GetMapping(path = "/buscar")
	public List<Reserva> buscarReserva() {
		return rr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Reserva guardarReserva(@RequestBody Reserva a) {
		return rr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_reserva}")
	public void eliminarReserva(@PathVariable("id_reserva") int id_reserva) {
		rr.deleteById(id_reserva);
	}
}
