import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class FixMySQL {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/spring_DB?useSSL=false&serverTimezone=UTC", "root", "");
            Statement stmt = conn.createStatement();
            stmt.execute("SET GLOBAL max_allowed_packet=16777216");
            System.out.println("Set global max_allowed_packet to 16MB.");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
