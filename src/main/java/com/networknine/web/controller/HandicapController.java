package com.networknine.web.controller;

/**
 * Created by robertm on 5/11/17.
 */
import com.networknine.web.model.Golfers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class HandicapController {

    @RequestMapping(value = "/handicaps", method = RequestMethod.GET)
    public List<Golfers> list() {

        return GolfersStub.list();

    }

}
