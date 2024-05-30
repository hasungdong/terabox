package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class MovieRegex {
    public static final Regex title = new Regex("^([\\da-zA-z가-힣()\\-. !]{1,100})$");
}