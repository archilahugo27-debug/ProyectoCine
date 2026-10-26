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

import umg.seccionA.proyecto2026.entity.Cliente;
import umg.seccionA.proyecto2026.entity.Usuario;
import umg.seccionA.proyecto2026.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
@CrossOrigin
public class UsuarioService {
	@Autowired
	UsuarioRepository ur;

	@GetMapping(path = "/buscar")
	public List<Usuario> buscarUsuario() {
		return ur.findAll();
	}

	@PostMapping(path = "/guardar")
	public Usuario guardarUsuario(@RequestBody Usuario a) {
		return ur.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_usuario}")
	public void eliminarUsuario(@PathVariable("id_usuario") int id_usuario) {
		ur.deleteById(id_usuario);
	}

	@GetMapping(path = "/buscar/{correo}/{contrasena}")
	public List<Usuario> buscarClienteContrasenaCorreo(@PathVariable("correo") String correo,
			@PathVariable("contrasena") String contrasena) {
		return ur.findByCorreoAndContrasena(correo, contrasena);
	}

	@PostMapping(path = "/login")
	public Usuario login(@RequestBody Usuario u) {
		List<Usuario> usuarios = ur.findByCorreoAndContrasena(u.getCorreo(), u.getContrasena());

		if (usuarios.isEmpty()) {
			return null;
		} else {
			return usuarios.get(0);
		}
	}

}
