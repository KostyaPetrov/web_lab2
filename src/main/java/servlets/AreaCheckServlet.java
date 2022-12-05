package servlets;

import beans.Point;
import beans.PointBean;
import exceptions.WrongDataException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;


@WebServlet(name = "AreaCheckServlet", value = "/check")
public class AreaCheckServlet extends HttpServlet {

    private List<Double> xRange = Arrays.asList(-5.0,-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0);
    private List<Double> rRange = Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long startTime = System.nanoTime();

        String x = req.getParameter("x_coordinate");
        String y = req.getParameter("y_coordinate");
        String r = req.getParameter("r_coordinate");
        double xValue,yValue,rValue;
        try{
            if(x==null || x.equals("")) throw new WrongDataException("x not set");
            if(y==null || y.equals("")) throw  new WrongDataException("y not set");
            if(r==null || r.equals("")) throw  new WrongDataException("r not set");

            x = x.trim();
            y = y.trim();
            r = r.trim();
            xValue = parseX(x);
            yValue = parseY(y);
            rValue = parseY(r);

            boolean isInside =  firstQuarter(xValue, yValue, rValue) ||
                    secondQuarter(xValue, yValue, rValue) ||
                    fourthQuarter(xValue, yValue, rValue);

            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(req.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "no info";
            }
            String executionTime = String.format("%.9f",(Double)((System.nanoTime() - startTime)/1_000_000_000.0));

            PointBean points = (PointBean) req.getSession().getAttribute("table");
            if (points == null) points = new PointBean();

            Point point = new Point(xValue, yValue, rValue, currentTime, executionTime, isInside);
            points.getPoints().add(point);
            req.getSession().setAttribute("table", points);
            req.getSession().setAttribute("check", point);


            getServletContext().getRequestDispatcher("/result_page.jsp").forward(req, resp);

        } catch (WrongDataException e){
            req.setAttribute("error_message", e.getMessage());
            getServletContext().getRequestDispatcher("/wrong_data.jsp").forward(req, resp);

        }


    }

    private double parseX(String x) throws  WrongDataException{
        double dx;
        try{
            dx = Double.parseDouble(x);
            if(dx>3||dx<-5) throw new WrongDataException("x is wrong format: " + dx);
        } catch (NumberFormatException e){
            throw new WrongDataException("x is wrong format");
        }
        return Math.round(dx*1000.0)/1000.0;
    }

    private double parseY(String y) throws WrongDataException{
        double dy;
        try{
            dy = Double.parseDouble(y);
            if(!( -5.0 <= dy && dy <= 5.0)) throw new WrongDataException("y is wrong format: " + dy );
        } catch (NumberFormatException e){
            throw new WrongDataException("y is wrong format");
        }
        return Math.round(dy*1000.0)/1000.0;
    }

    private double parseR(String r) throws WrongDataException {
        double dr;
        try{
            dr = Double.parseDouble(r);
            if(dr<1||dr>5) throw new WrongDataException("r is wrong format");
        } catch (NumberFormatException e){
            throw new WrongDataException("r is wrong format");
        }
        return Math.round(dr*1000.0)/1000.0;
    }

    private boolean firstQuarter(double x, double y, double r){

        return x >= 0 && y >= 0 && x<=r && y<=r;
    }

    private boolean secondQuarter(double x, double y, double r){


        return x<=0 && y>=0 && y<=x+r/2;
    }

    private boolean fourthQuarter(double x, double y, double r){

        return x>=0 && y<=0 && x*x + y*y <= (r/2)*(r/2);
    }
}
