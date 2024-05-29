package com.terabox.demo.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"directorIndex", "movieIndex"})
public class DirectorMovieMappingEntity {
    private int directorIndex;
    private int movieIndex;
}
