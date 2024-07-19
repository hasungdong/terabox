package com.terabox.demo.regexes;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ProductRegex {
    public static final Regex proName = new Regex("^([\\[\\]\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s\\n]{1,100})$");
    public static final Regex subTitle = new Regex("^([\\[\\]\\da-zA-Z가-힣\\(\\)\\-.,…?!·<>\\\"“”\\'’\\s\\n]{1,30})$");
}
