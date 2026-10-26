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

import umg.seccionA.proyecto2026.entity.Asiento;
import umg.seccionA.proyecto2026.repository.AsientoRepository;

@RestController
@RequestMapping("/asiento")
@CrossOrigin
public class AsientoService {
	@Autowired
	AsientoRepository ar;

	@GetMapping(path = "/buscar")
	public List<Asiento> buscaraAsiento() {
		return ar.findAll();
	}

	@GetMapping(path = "/buscar/{idSala}")
	public List<Asiento> buscaraAsientoPorIdSala(@PathVariable("idSala") int idSala) {
		return ar.findByIdSala(idSala);
	}

	@PostMapping(path = "/guardar")
	public Asiento guardarAsiento(@RequestBody Asiento a) {
		return ar.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_asiento}")
	public void eliminarGenero(@PathVariable("id_asiento") int id_asiento) {
		ar.deleteById(id_asiento);
	}
}
