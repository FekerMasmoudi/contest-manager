package tn.soretras.contestmanager.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link tn.soretras.contestmanager.domain.Contest} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContestDTO implements Serializable {

    private String id;

    @NotNull
    private Integer code;

    @NotNull
    private Integer rank;

    @NotNull
    private String name;

    private String parent;

    @NotNull
    private Integer nbpositions;

    private Boolean status;

    private ContestannounceDTO contestannounce;

    private GradeDTO grade;

    private SpecialityDTO speciality;

    private SectorDTO sector;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public Integer getNbpositions() {
        return nbpositions;
    }

    public void setNbpositions(Integer nbpositions) {
        this.nbpositions = nbpositions;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public ContestannounceDTO getContestannounce() {
        return contestannounce;
    }

    public void setContestannounce(ContestannounceDTO contestannounce) {
        this.contestannounce = contestannounce;
    }

    public GradeDTO getGrade() {
        return grade;
    }

    public void setGrade(GradeDTO grade) {
        this.grade = grade;
    }

    public SpecialityDTO getSpeciality() {
        return speciality;
    }

    public void setSpeciality(SpecialityDTO speciality) {
        this.speciality = speciality;
    }

    public SectorDTO getSector() {
        return sector;
    }

    public void setSector(SectorDTO sector) {
        this.sector = sector;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContestDTO)) {
            return false;
        }

        ContestDTO contestDTO = (ContestDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contestDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContestDTO{" +
            "id='" + getId() + "'" +
            ", code=" + getCode() +
            ", rank=" + getRank() +
            ", name='" + getName() + "'" +
            ", parent='" + getParent() + "'" +
            ", nbpositions=" + getNbpositions() +
            ", status='" + getStatus() + "'" +
            ", contestannounce=" + getContestannounce() +
            ", grade=" + getGrade() +
            ", speciality=" + getSpeciality() +
            ", sector=" + getSector() +
            "}";
    }
}
