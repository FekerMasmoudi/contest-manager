package tn.soretras.contestmanager.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Educationlevel.
 */
@Document(collection = "educationlevel")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Educationlevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("rank")
    private Integer rank;

    @NotNull
    @Field("designation")
    private String designation;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Educationlevel id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getRank() {
        return this.rank;
    }

    public Educationlevel rank(Integer rank) {
        this.setRank(rank);
        return this;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Educationlevel designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Educationlevel)) {
            return false;
        }
        return id != null && id.equals(((Educationlevel) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Educationlevel{" +
            "id=" + getId() +
            ", rank=" + getRank() +
            ", designation='" + getDesignation() + "'" +
            "}";
    }
}
