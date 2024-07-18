package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class MovieRegex {
    public static final Regex title = new Regex("^([\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s]{1,100})$");

    public static final Regex explanation = new Regex("^([\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s]{1,50})$");

    public static final Regex subExplanation = new Regex("^([\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s]{1,1000})$");
}
