package com.networknine.web.model;

import java.util.Date;

public class Golfers {
	Integer id;
	String golfer;
	Integer handicap;

	public Golfers() { }

	public Golfers(int id, String golfer, int handicap) {
		this.id = id;
		this.golfer = golfer;
		this.handicap = handicap;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGolfer() {
		return golfer;
	}

	public void setGolfer(String name) {
		this.golfer = golfer;
	}

	public Integer getHandicap() {
		return handicap;
	}

	public void setHandicap(int handicap) {
		this.id = handicap;
	}

}
