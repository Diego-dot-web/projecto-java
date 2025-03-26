package com.database;

import java.sql.SQLException;
import java.sql.Statement;

public class UserDB {

    public static int add(User user) {
        var sql = "INSERT INTO usuarios(id_usuario, nombre, email, contraseña) " +
                "VALUES(?,?,?,?)";

        try (var con = DB.connect();
                var pstmt = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            System.out.println("id es " + user.getId());
            pstmt.setString(1, user.getId());
            pstmt.setString(2, user.getName());
            pstmt.setString(3, user.getEmail());
            pstmt.setString(4, user.getPassword());

            int insertedRow = pstmt.executeUpdate();
            if (insertedRow > 0) {
                var rs = pstmt.getGeneratedKeys();
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return -1;
    }
}