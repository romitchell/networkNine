package com.networknine.web.controller;

/**
 * Created by robertm on 5/11/17.
 */
import com.networknine.web.model.Match;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
public class StandingsController {

    @RequestMapping(value = "/standings", method = RequestMethod.GET)
    public String standings(){

        return "standings";

    }
//    public List<Match> list() {
//
//        return MatchStub.list();
//
//    }

}
