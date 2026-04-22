import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DropTables {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/spring_DB?useSSL=false&serverTimezone=UTC", "root", "");
            Statement stmt = conn.createStatement();
            stmt.executeUpdate("DROP TABLE IF EXISTS image");
            stmt.executeUpdate("DROP TABLE IF EXISTS aimodel");
            stmt.executeUpdate("DROP TABLE IF EXISTS aicategory");
            System.out.println("Old tables dropped!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
