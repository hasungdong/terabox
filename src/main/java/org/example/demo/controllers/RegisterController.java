package org.example.demo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/register")
@RequiredArgsConstructor
public class RegisterController {

    @GetMapping(value = "/register", produces = MediaType.TEXT_HTML_VALUE)
    public String getRegister(Model model) {
        return "register/register";
    }

    @GetMapping(value = "/registerTwo", produces = MediaType.TEXT_HTML_VALUE)
    public String getRegister2(Model model) {
        return "register/registerTwo";
    }

    @GetMapping(value = "/registerThree", produces = MediaType.TEXT_HTML_VALUE)
    public String getRegister3(Model model) {
        return "register/registerThree";
    }

    @GetMapping(value = "/registerFour", produces = MediaType.TEXT_HTML_VALUE)
    public String getRegister4(Model model) {
        return "register/registerFour";
    }

}
