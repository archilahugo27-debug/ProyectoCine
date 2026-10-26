package umg.seccionA.proyecto2026.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import umg.seccionA.proyecto2026.entity.Usuario;

@Repository("usuarioRepository")
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	public List<Usuario> findByCorreoAndContrasena(String correo, String contrasena);
}
