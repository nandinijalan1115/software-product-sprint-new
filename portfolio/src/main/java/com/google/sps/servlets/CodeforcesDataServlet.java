package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/codeforces-ratings")
public class CodeforcesDataServlet extends HttpServlet {

  private LinkedHashMap<Integer, Integer> ratings = new LinkedHashMap<>();

  @Override
  public void init() {
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/ratings.csv"));
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");

      Integer contest_number = Integer.valueOf(cells[0]);
      Integer contest_rating = Integer.valueOf(cells[1]);

      ratings.put(contest_number, contest_rating);
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    
    Gson gson = new Gson();
    String json = gson.toJson(ratings);
    response.getWriter().println(json);
  }
}
