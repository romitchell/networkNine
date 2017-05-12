package com.networknine.web.model;

import java.util.Date;

public class Match {
	Long id;
	String golfer;
	String partner;
	String opp1;
	String opp2;
	Date date;
	Integer score;
	Integer points;
	String course;
	Integer slope;
	Double rating;

	public Match() { }

	public Match(Long id) {
		this.id = id;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



}
