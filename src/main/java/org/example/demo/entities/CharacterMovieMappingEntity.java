package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"characterIndex, movieIndex"})
public class CharacterMovieMappingEntity {
    private int characterIndex;
    private int movieIndex;
}
