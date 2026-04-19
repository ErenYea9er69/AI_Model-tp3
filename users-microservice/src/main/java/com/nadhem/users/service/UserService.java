import com.nadhem.users.register.RegistationRequest;

public interface UserService {
    User saveUser(User user);
    User findUserByUsername(String username);
    Role addRole(Role role);
    User addRoleToUser(String username, String rolename);
    List<User> findAllUsers();
    User registerUser(RegistationRequest request);
    public void sendEmailUser(User u, String code);
    User validateToken(String code);
}
