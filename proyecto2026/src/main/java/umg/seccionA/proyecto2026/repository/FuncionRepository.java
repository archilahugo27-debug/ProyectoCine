package umg.seccionA.proyecto2026.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import umg.seccionA.proyecto2026.entity.Funcion;

@Repository("funcionRepository")
public interface FuncionRepository extends JpaRepository<Funcion, Integer> {

}
