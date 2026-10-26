package umg.seccionA.proyecto2026.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import umg.seccionA.proyecto2026.entity.Examen;

public interface ExamenRepository extends JpaRepository<Examen, Integer> {
	public List<Examen> findByCarnet(String carnet);
}
