package org.example.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = "index")
public class CharacterEntity {
    private int index;
    private String  characterName;
    private String  realName;
}
