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

import umg.seccionA.proyecto2026.entity.Examen;
import umg.seccionA.proyecto2026.repository.ExamenRepository;

@RestController
@RequestMapping("/examen")
@CrossOrigin
public class ExamenService {
	@Autowired
	ExamenRepository er;

	@GetMapping(path = "/buscar")
	public List<Examen> buscarExamen() {
		return er.findAll();
	}

	@PostMapping(path = "/guardar")
	public Examen guardarExamen(@RequestBody Examen a) {
		return er.save(a);
	}

	@DeleteMapping(path = "/eliminar/{idexamen}")
	public void eliminarUsuario(@PathVariable("idexamen") int idexamen) {
		er.deleteById(idexamen);
	}

	@GetMapping(path = "/buscar/{carnet}")
	public List<Examen> buscarExamenCarnet(@PathVariable("carnet") String carnet) {
		return er.findByCarnet(carnet);
	}

}
