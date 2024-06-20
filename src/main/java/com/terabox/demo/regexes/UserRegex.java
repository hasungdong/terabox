package com.terabox.demo.regexes;


import lombok.experimental.UtilityClass;

@UtilityClass // 객체화가 불가능해지는 어노테이션
public class UserRegex {
    public static final Regex email = new Regex("^(?=.{5,50}$)([\\da-zA-Z_.]{4,})@([\\da-z\\-]+\\.)?([\\da-z\\-]+)\\.([a-z]{2,15})(\\.[a-z]{2})?$");
    public static final Regex password = new Regex("^([\\da-zA-Z`~!@#$%^&*()\\-_=+\\[{\\]}\\\\|;:\",<.>/?]{5,50})$");
    public static final Regex nickname = new Regex("^([\\da-zA-Z가-힣]{2,10})$");

}
