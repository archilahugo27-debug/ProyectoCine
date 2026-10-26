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
import umg.seccionA.proyecto2026.repository.ClienteRepository;

@RestController
@RequestMapping("/cliente")
@CrossOrigin
public class ClienteService {
	@Autowired
	ClienteRepository cr;

	@GetMapping(path = "/buscar/{correo}/{contrasena}")
	public List<Cliente> buscarClienteContrasenaCorreo(@PathVariable("correo") String correo,
			@PathVariable("contrasena") String contrasena) {
		return cr.findByCorreoAndContrasena(correo, contrasena);
	}

	@GetMapping(path = "/buscar")
	public List<Cliente> buscarCliente() {
		return cr.findAll();
	}

	@PostMapping(path = "/guardar")
	public Cliente guardarCliente(@RequestBody Cliente a) {
		return cr.save(a);
	}

	@DeleteMapping(path = "/eliminar/{id_cliente}")
	public void eliminarCliente(@PathVariable("id_cliente") int id_cliente) {
		cr.deleteById(id_cliente);
	}

	@PostMapping(path = "/ingresar")
	public Cliente login(@RequestBody Cliente u) {
		List<Cliente> clientes = cr.findByCorreoAndContrasena(u.getCorreo(), u.getContrasena());

		if (clientes.isEmpty()) {
			return null;
		} else {
			return clientes.get(0);
		}
	}
}
