package servlets;

import beans.PointBean;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getParameter("x_coordinate") != null && req.getParameter("y_coordinate") != null
                && req.getParameter("r_coordinate") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
        }
        else if (req.getParameter("clear") != null){
            //Get Beans for clean
            PointBean beans = (PointBean) req.getSession().getAttribute("table");
            if (beans == null) beans = new PointBean();
            beans.getPoints().clear();
            req.getSession().setAttribute("table", beans);
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
        else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
}
