package tn.soretras.contestmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import tn.soretras.contestmanager.domain.enumeration.etype;

/**
 * A Fieldcontestform.
 */
@Document(collection = "fieldcontestform")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Fieldcontestform implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("fname")
    private String fname;

    @NotNull
    @Field("ftype")
    private etype ftype;

    @Field("fvalue")
    private String fvalue;

    @Field("frank")
    private Integer frank;

    @Field("fsize")
    private Integer fsize;

    @DBRef
    @Field("contestform")
    @JsonIgnoreProperties(value = { "contest", "user" }, allowSetters = true)
    private Contestform contestform;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Fieldcontestform id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFname() {
        return this.fname;
    }

    public Fieldcontestform fname(String fname) {
        this.setFname(fname);
        return this;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public etype getFtype() {
        return this.ftype;
    }

    public Fieldcontestform ftype(etype ftype) {
        this.setFtype(ftype);
        return this;
    }

    public void setFtype(etype ftype) {
        this.ftype = ftype;
    }

    public String getFvalue() {
        return this.fvalue;
    }

    public Fieldcontestform fvalue(String fvalue) {
        this.setFvalue(fvalue);
        return this;
    }

    public void setFvalue(String fvalue) {
        this.fvalue = fvalue;
    }

    public Integer getFrank() {
        return this.frank;
    }

    public Fieldcontestform frank(Integer frank) {
        this.setFrank(frank);
        return this;
    }

    public void setFrank(Integer frank) {
        this.frank = frank;
    }

    public Integer getFsize() {
        return this.fsize;
    }

    public Fieldcontestform fsize(Integer fsize) {
        this.setFsize(fsize);
        return this;
    }

    public void setFsize(Integer fsize) {
        this.fsize = fsize;
    }

    public Contestform getContestform() {
        return this.contestform;
    }

    public void setContestform(Contestform contestform) {
        this.contestform = contestform;
    }

    public Fieldcontestform contestform(Contestform contestform) {
        this.setContestform(contestform);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fieldcontestform)) {
            return false;
        }
        return id != null && id.equals(((Fieldcontestform) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fieldcontestform{" +
            "id=" + getId() +
            ", fname='" + getFname() + "'" +
            ", ftype='" + getFtype() + "'" +
            ", fvalue='" + getFvalue() + "'" +
            ", frank=" + getFrank() +
            ", fsize=" + getFsize() +
            "}";
    }
}
