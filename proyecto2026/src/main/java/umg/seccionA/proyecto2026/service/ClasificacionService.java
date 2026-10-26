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

import umg.seccionA.proyecto2026.entity.Clasificacion;
import umg.seccionA.proyecto2026.repository.ClasificacionRepository;

@RestController
@RequestMapping("/clasificacion")
@CrossOrigin
public class ClasificacionService {
	@Autowired
	ClasificacionRepository cr;

	@GetMapping(path = "/buscar")
	public List<Clasificacion> buscarClasificacion() {
		return cr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Clasificacion guardarClasificacion(@RequestBody Clasificacion a) {
		return cr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_clasificacion}")
	public void eliminarClasificacion(@PathVariable("id_clasificacion") int id_clasificacion) {
		cr.deleteById(id_clasificacion);
	}
}
