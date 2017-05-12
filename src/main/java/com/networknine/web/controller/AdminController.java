package com.networknine.web.controller;

/**
 * Created by robertm on 5/11/17.
 */
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AdminController {

    @RequestMapping("/Admin/")
    public String login() {
        return "Admin/login";
    }

    @RequestMapping(value="/addGolfer")
    public String addGolfer() {
        return "Admin/addGolfer";
    }
}
