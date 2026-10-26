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

import umg.seccionA.proyecto2026.entity.Anuncio;
import umg.seccionA.proyecto2026.repository.AnuncioRepository;

@RestController
@RequestMapping("/anuncio")
@CrossOrigin
public class AnuncioService {
	@Autowired
	AnuncioRepository ar;

	@GetMapping(path = "/buscar")
	public List<Anuncio> buscarAnuncio() {
		return ar.findAll();
	}

	@PostMapping(path = "/guardar")
	public Anuncio guardarAnuncio(@RequestBody Anuncio a) {
		return ar.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_anuncio}")
	public void eliminarGenero(@PathVariable("id_anuncio") int id_anuncio) {
		ar.deleteById(id_anuncio);
	}
}
