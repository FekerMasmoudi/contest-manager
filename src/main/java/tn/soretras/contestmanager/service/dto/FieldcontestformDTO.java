package tn.soretras.contestmanager.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;
import tn.soretras.contestmanager.domain.enumeration.etype;

/**
 * A DTO for the {@link tn.soretras.contestmanager.domain.Fieldcontestform} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FieldcontestformDTO implements Serializable {

    private String id;

    @NotNull
    private String fname;

    @NotNull
    private etype ftype;

    private String fvalue;

    private Integer frank;

    private Integer fsize;

    private ContestformDTO contestform;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public etype getFtype() {
        return ftype;
    }

    public void setFtype(etype ftype) {
        this.ftype = ftype;
    }

    public String getFvalue() {
        return fvalue;
    }

    public void setFvalue(String fvalue) {
        this.fvalue = fvalue;
    }

    public Integer getFrank() {
        return frank;
    }

    public void setFrank(Integer frank) {
        this.frank = frank;
    }

    public Integer getFsize() {
        return fsize;
    }

    public void setFsize(Integer fsize) {
        this.fsize = fsize;
    }

    public ContestformDTO getContestform() {
        return contestform;
    }

    public void setContestform(ContestformDTO contestform) {
        this.contestform = contestform;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FieldcontestformDTO)) {
            return false;
        }

        FieldcontestformDTO fieldcontestformDTO = (FieldcontestformDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, fieldcontestformDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FieldcontestformDTO{" +
            "id='" + getId() + "'" +
            ", fname='" + getFname() + "'" +
            ", ftype='" + getFtype() + "'" +
            ", fvalue='" + getFvalue() + "'" +
            ", frank=" + getFrank() +
            ", fsize=" + getFsize() +
            ", contestform=" + getContestform() +
            "}";
    }
}
