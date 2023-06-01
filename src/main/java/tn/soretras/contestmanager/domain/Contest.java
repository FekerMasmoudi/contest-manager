package tn.soretras.contestmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Contest.
 */
@Document(collection = "contest")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Contest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("code")
    private Integer code;

    @NotNull
    @Field("rank")
    private Integer rank;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("parent")
    private String parent;

    @NotNull
    @Field("nbpositions")
    private Integer nbpositions;

    @Field("status")
    private Boolean status;

    @DBRef
    @Field("contestannounce")
    @JsonIgnoreProperties(value = { "generalrules" }, allowSetters = true)
    private Contestannounce contestannounce;

    @DBRef
    @Field("grade")
    @JsonIgnoreProperties(value = { "certificate", "educationlevel" }, allowSetters = true)
    private Grade grade;

    @DBRef
    @Field("speciality")
    private Speciality speciality;

    @DBRef
    @Field("sector")
    private Sector sector;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Contest id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCode() {
        return this.code;
    }

    public Contest code(Integer code) {
        this.setCode(code);
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Integer getRank() {
        return this.rank;
    }

    public Contest rank(Integer rank) {
        this.setRank(rank);
        return this;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getName() {
        return this.name;
    }

    public Contest name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParent() {
        return this.parent;
    }

    public Contest parent(String parent) {
        this.setParent(parent);
        return this;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public Integer getNbpositions() {
        return this.nbpositions;
    }

    public Contest nbpositions(Integer nbpositions) {
        this.setNbpositions(nbpositions);
        return this;
    }

    public void setNbpositions(Integer nbpositions) {
        this.nbpositions = nbpositions;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Contest status(Boolean status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Contestannounce getContestannounce() {
        return this.contestannounce;
    }

    public void setContestannounce(Contestannounce contestannounce) {
        this.contestannounce = contestannounce;
    }

    public Contest contestannounce(Contestannounce contestannounce) {
        this.setContestannounce(contestannounce);
        return this;
    }

    public Grade getGrade() {
        return this.grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Contest grade(Grade grade) {
        this.setGrade(grade);
        return this;
    }

    public Speciality getSpeciality() {
        return this.speciality;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    public Contest speciality(Speciality speciality) {
        this.setSpeciality(speciality);
        return this;
    }

    public Sector getSector() {
        return this.sector;
    }

    public void setSector(Sector sector) {
        this.sector = sector;
    }

    public Contest sector(Sector sector) {
        this.setSector(sector);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Contest)) {
            return false;
        }
        return id != null && id.equals(((Contest) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Contest{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", rank=" + getRank() +
            ", name='" + getName() + "'" +
            ", parent='" + getParent() + "'" +
            ", nbpositions=" + getNbpositions() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
