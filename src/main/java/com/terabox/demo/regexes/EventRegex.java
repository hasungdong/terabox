package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class EventRegex {
    public static final Regex title = new Regex("^([\\da-zA-z가-힣()\\-. !]{1,100})$");

}
