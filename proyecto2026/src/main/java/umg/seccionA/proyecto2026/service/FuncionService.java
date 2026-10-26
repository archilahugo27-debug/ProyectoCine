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

import umg.seccionA.proyecto2026.entity.Funcion;
import umg.seccionA.proyecto2026.repository.FuncionRepository;

@RestController
@RequestMapping("/funcion")
@CrossOrigin
public class FuncionService {
	@Autowired
	FuncionRepository fr;

	@GetMapping(path = "/buscar")
	public List<Funcion> buscarFuncion() {
		return fr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Funcion guardarFuncion(@RequestBody Funcion a) {
		return fr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_funcion}")
	public void eliminarCliente(@PathVariable("id_funcion") int id_funcion) {
		fr.deleteById(id_funcion);
	}
}
