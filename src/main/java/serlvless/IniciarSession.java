package serlvless;

import java.io.IOException;
import java.sql.SQLException;
import com.database.DB;
import com.database.User;
import com.database.UserDB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "IniciarSession", urlPatterns = { "/registro-post" })
public class IniciarSession extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            var name = req.getParameter("nombre");
            var email = req.getParameter("email");
            var password = req.getParameter("password");

            var user = new User(name, email, password);

            var id = UserDB.add(user);

            System.out.println("INSERTED " + id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("funciona que es lo importante");
        resp.sendRedirect("/testeo/registro.html");
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
