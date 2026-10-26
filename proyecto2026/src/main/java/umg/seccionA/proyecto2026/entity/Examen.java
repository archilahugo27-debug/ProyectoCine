package umg.seccionA.proyecto2026.entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "examen")
public class Examen implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6012889163613290605L;

	@Id
	@Column(name = "idexamen")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Basic(optional = false)
	private int idexamen;

	@Column(name = "fecha_examen")
	private Date fechaExamen;

	@Column(name = "nota")
	private int nota;

	@Column(name = "carnet")
	private String carnet;

	public int getIdanuncio() {
		return idexamen;
	}

	public void setIdanuncio(int idanuncio) {
		this.idexamen = idanuncio;
	}

	public Date getFechaExamen() {
		return fechaExamen;
	}

	public void setFechaExamen(Date fechaExamen) {
		this.fechaExamen = fechaExamen;
	}

	public int getNota() {
		return nota;
	}

	public void setNota(int nota) {
		this.nota = nota;
	}

	public String getCarnet() {
		return carnet;
	}

	public void setCarnet(String carnet) {
		this.carnet = carnet;
	}

}
