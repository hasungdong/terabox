package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ProductRegex {
    public static final Regex proName = new Regex("^([\\da-zA-z가-힣()\\-. !]{1,100})$");
}
