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

import umg.seccionA.proyecto2026.entity.Rol;
import umg.seccionA.proyecto2026.repository.RolRepository;

@RestController
@RequestMapping("/rol")
@CrossOrigin
public class RolService {
	@Autowired
	RolRepository rr;

	@GetMapping(path = "/buscar")
	public List<Rol> buscarRol() {
		return rr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Rol guardarRol(@RequestBody Rol a) {
		return rr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_rol}")
	public void eliminarRol(@PathVariable("id_rol") int id_rol) {
		rr.deleteById(id_rol);
	}
}
