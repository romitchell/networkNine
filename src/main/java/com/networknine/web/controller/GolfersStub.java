package com.networknine.web.controller;

import com.networknine.web.model.Golfers;
import com.networknine.web.model.Match;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GolfersStub {
	private static Map<Integer, Golfers> golfers = new HashMap<Integer, Golfers>();
	private static int idIndex = 1;

	//populate initial golfers
	static {
		Golfers a = new Golfers(1, "Robbie Mitchell", 8);
		golfers.put(1, a);

	}

	public static List<Golfers> list() {
		return new ArrayList<Golfers>(golfers.values());
	}

	@RequestMapping(value = "/handicaps", method = RequestMethod.POST)
	public static Golfers create(Golfers golfer) {
		idIndex += idIndex;
		golfer.setId(idIndex);
		golfers.put(idIndex, golfer);
		return golfer;
	}

	public static Golfers get(int id) {
		return golfers.get(id);
	}

	public static Golfers update(int id, Golfers golfer) {
		golfers.put(id, golfer);
		return golfer;
	}

	public static Golfers delete(int id) {
		return golfers.remove(id);
	}
}
