package umg.seccionA.proyecto2026.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import umg.seccionA.proyecto2026.entity.Asiento;

@Repository("asientoRepository")
public interface AsientoRepository extends JpaRepository<Asiento, Integer> {
	public List<Asiento> findByIdSala(int idSala);
}
