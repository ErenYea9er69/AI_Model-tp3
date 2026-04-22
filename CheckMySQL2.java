import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class CheckMySQL2 {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/spring_DB?useSSL=false&serverTimezone=UTC", "root", "");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SHOW VARIABLES LIKE 'max_allowed_packet'");
            if (rs.next()) {
                System.out.println("CURRENT max_allowed_packet: " + rs.getString(2));
            }
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
