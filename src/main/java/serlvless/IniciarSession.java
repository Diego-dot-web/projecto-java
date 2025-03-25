package serlvless;

import java.io.IOException;
import java.sql.SQLException;
import com.database.DB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "IniciarSession", urlPatterns = { "/iniciar" })
public class IniciarSession extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("funciona que es lo importante");
        resp.sendRedirect("/testeo");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try (var connection = DB.connect()) {
            System.out.println("conected");
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
    }

}
