package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class EventRegex {
    public static final Regex title = new Regex("^([\\[\\]\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s]{1,100})$");

}
