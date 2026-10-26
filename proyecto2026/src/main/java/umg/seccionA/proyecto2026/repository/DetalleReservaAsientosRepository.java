package umg.seccionA.proyecto2026.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import umg.seccionA.proyecto2026.entity.DetalleReservaAsientos;

@Repository("detalleReservaAsientosRepository")
public interface DetalleReservaAsientosRepository extends JpaRepository<DetalleReservaAsientos, Integer> {

}
