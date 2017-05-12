package com.networknine.web.controller;

/**
 * Created by robertm on 5/11/17.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {

    @RequestMapping("/")
        public String home() {
            return "NetworkNineHomepage";
    }


}
