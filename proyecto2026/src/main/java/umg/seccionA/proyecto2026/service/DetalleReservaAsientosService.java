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

import umg.seccionA.proyecto2026.entity.DetalleReservaAsientos;
import umg.seccionA.proyecto2026.repository.DetalleReservaAsientosRepository;

@RestController
@RequestMapping("/detalleasientos")
@CrossOrigin
public class DetalleReservaAsientosService {
	@Autowired
	DetalleReservaAsientosRepository drar;

	@GetMapping(path = "/buscar")
	public List<DetalleReservaAsientos> buscarAnuncio() {
		return drar.findAll();
	}

	@PostMapping(path = "/guardar")
	public DetalleReservaAsientos guardarAnuncio(@RequestBody DetalleReservaAsientos a) {
		return drar.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_detalle}")
	public void eliminarGenero(@PathVariable("id_detalle") int id_detalle) {
		drar.deleteById(id_detalle);
	}
}
