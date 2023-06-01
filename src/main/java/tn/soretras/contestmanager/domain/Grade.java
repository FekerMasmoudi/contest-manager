package tn.soretras.contestmanager.domain;

import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Grade.
 */
@Document(collection = "grade")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("code")
    private Integer code;

    @NotNull
    @Field("designation")
    private String designation;

    @DBRef
    @Field("certificate")
    private Certificate certificate;

    @DBRef
    @Field("educationlevel")
    private Educationlevel educationlevel;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Grade id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCode() {
        return this.code;
    }

    public Grade code(Integer code) {
        this.setCode(code);
        return this;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDesignation() {
        return this.designation;
    }

    public Grade designation(String designation) {
        this.setDesignation(designation);
        return this;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Certificate getCertificate() {
        return this.certificate;
    }

    public void setCertificate(Certificate certificate) {
        this.certificate = certificate;
    }

    public Grade certificate(Certificate certificate) {
        this.setCertificate(certificate);
        return this;
    }

    public Educationlevel getEducationlevel() {
        return this.educationlevel;
    }

    public void setEducationlevel(Educationlevel educationlevel) {
        this.educationlevel = educationlevel;
    }

    public Grade educationlevel(Educationlevel educationlevel) {
        this.setEducationlevel(educationlevel);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Grade)) {
            return false;
        }
        return id != null && id.equals(((Grade) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", code=" + getCode() +
            ", designation='" + getDesignation() + "'" +
            "}";
    }
}
