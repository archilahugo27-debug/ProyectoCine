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

import umg.seccionA.proyecto2026.entity.Pelicula;
import umg.seccionA.proyecto2026.repository.PeliculaRepository;

@RestController
@RequestMapping("/pelicula")
@CrossOrigin
public class PeliculaService {
	@Autowired
	PeliculaRepository pr;

	@GetMapping(path = "/buscar")
	public List<Pelicula> buscarPelicula() {
		return pr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Pelicula guardarPelicula(@RequestBody Pelicula a) {
		return pr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_pelicula}")
	public void eliminarGenero(@PathVariable("id_pelicula") int id_pelicula) {
		pr.deleteById(id_pelicula);
	}
}
