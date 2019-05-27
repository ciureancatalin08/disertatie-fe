// =================================================================================================
// Copyright (c) 2017-2020 BMW Group. All rights reserved.
// =================================================================================================
package msg.user.control;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import msg.exceptions.BusinessException;
import msg.exceptions.BusinessWebAppException;
import msg.notification.boundary.NotificationFacade;
import msg.notification.boundary.notificationParams.NotificationParamsWelcomeUser;
import msg.notification.entity.NotificationType;
import msg.role.entity.RoleEntity;
import msg.user.MessageCatalog;

import msg.user.entity.dto.UserDTO;



import msg.user.entity.UserEntity;
import msg.user.entity.dao.UserDAO;
import msg.user.entity.dto.UserConverter;
import msg.user.entity.dto.UserInputDTO;
import msg.user.entity.dto.UserLoginDTO;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Control operations for all the User related operations.
 *
 * @author msg-system ag;  Daniel Donea
 * @since 1.0
 */
@Stateless
public class UserControl {

    @EJB
    private UserDAO userDao;

    @EJB
    private UserConverter userConverter;

    @EJB
    private NotificationFacade notificationFacade;



    public String authenticateUser(UserInputDTO userInputDTO) {

        try {

            UserEntity user = userDao.getUserByEmail(userInputDTO.getEmail());

//        Stream<String> roles = user.getRoles()
//                .stream()
//                .map(Role::getType);

            if (user != null) {
                Algorithm algorithm = Algorithm.HMAC256("harambe");
                return JWT.create().withIssuer("auth0")
                        .withClaim("username", user.getUsername())
                        .withArrayClaim("roles", user.getRoles()
                                .stream()
                                .map(RoleEntity::getType).toArray(String[]::new))
                        .sign(algorithm);

            } else {
                throw new BusinessException(MessageCatalog.USER_INVALID_USERNAME_OR_PASSWORD);
            }
        } catch (Exception e) {
            throw new BusinessException(MessageCatalog.USER_INVALID_USERNAME_OR_PASSWORD);
        }
    }

    /**
     * Creates a userDTO based on the {@link UserInputDTO}.
     *
     * @param userDTO the input User DTO. mandatory
     * @return the username of the newly created user.
     */

    public String createUser(final UserInputDTO userDTO) {
        if (userDao.existsEmail(userDTO.getEmail())) {
            throw new BusinessException(MessageCatalog.USER_WITH_SAME_MAIL_EXISTS);
        }

        final UserEntity newUserEntity = userConverter.convertInputDTOtoEntity(userDTO);

        newUserEntity.setUsername(this.createUserName(userDTO.getFirstName(), userDTO.getLastName()));
        newUserEntity.setStatus(true);
        newUserEntity.setPassword("DEFAULT_PASSWORD");
        userDao.createUser(newUserEntity);
        final long id = userDao.getUserByEmail(userDTO.getEmail()).getId();
        final String userFullName = newUserEntity.getFirstName() + " " + newUserEntity.getLastName();
//        = newUserEntity.getId();
        this.notificationFacade.createNotification(
                NotificationType.WELCOME_NEW_USER,
                new NotificationParamsWelcomeUser(userFullName, newUserEntity.getUsername()), id);

        return newUserEntity.getUsername();
    }

    /**
     * Creates a unique user name based on the inputs.
     *
     * @param firstName the first name of the user. mandatory
     * @param lastName  the last name of the user. mandatory
     * @return a unique identifier for the input user.
     */
    //TODO Replace with logic based on the specification
    private String createUserName(final String firstName, final String lastName) {
        String username = "";

            String lastNameBuild = lastName;
            String firstNameBuild = firstName;
            while(lastNameBuild.length() < 5) lastNameBuild += "-";
            while(firstNameBuild.length() < 5) firstNameBuild += "-";

            username = generateUsernameNormal(firstNameBuild, lastNameBuild);

            if(username.equals("")){
                username = generateUsernameWithNumber(firstNameBuild, lastNameBuild);

                if(username.equals("")){
                    username = generateUserNameRandom();
            }
        }

        return username;

    }

    private String generateUsernameWithNumber(String firstName, String lastName) {
        String username = lastName.substring(0, 5);
        for(int i = 0; i <= 99999; i++){
            int count = 4;
            String username1 = username + i;
            while(username1.length() > 6) username1 = username.substring( 0, --count) + i;

            if(!userDao.exitsUsername(username1.toLowerCase())){
               return username1.toLowerCase();
            }


        }
        return "";
    }

    public String generateUsernameNormal(String firstName, String lastName){

        int counterLastName = 6;
        int counterFirstName = 0;
        String username ="";
        //cand lastname e suficient
        if(lastName.length() > 4){
            do{
                if(counterLastName == 1) {
                    username = ""; break;
                }
                username = lastName.substring(0,--counterLastName)
                        + firstName.substring(0,++counterFirstName);
            }while(userDao.exitsUsername(username.toLowerCase()));


        }else {

            if (firstName.length() + lastName.length() >= 6) {

                username = lastName + firstName.substring(0, 6 - lastName.length());
                int lastNameLength = lastName.length();
                while (userDao.exitsUsername(username.toLowerCase())) {
                    if(lastNameLength == 1){
                        username = ""; break;
                    }

                    username = lastName.substring(0, --lastNameLength)
                            + firstName.substring(0, 6 - lastNameLength);
                }

            }
        }
        return username.toLowerCase();
    }

    private String generateUserNameRandom() {
        String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        int count = 8;
        StringBuilder builder = new StringBuilder();
        while (count-- != 0) {
            int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();

    }




    public void loginUser(UserLoginDTO userLoginDTO) {
        UserEntity userEntity;
        try{
            userEntity  = userDao.getUserByUsername(userLoginDTO.getUsername());
        }catch (Exception e){
            throw new BusinessException(MessageCatalog.USER_INVALID_USERNAME_OR_PASSWORD);
        }
        //verify password
        if(userEntity.isStatus()){

            if (!userEntity.getPassword().equals(userLoginDTO.getPassword())){
                // subtract the counter and throw message
                if(userEntity.getCounter() > 1){

                    int counter = userEntity.getCounter() - 1;
                    userEntity.setCounter(counter);
                    userDao.createUser(userEntity);

                    throw new BusinessWebAppException(MessageCatalog.USER_INVALID_USERNAME_OR_PASSWORD, 400);
                    // username inactive
                }else{
                    userEntity.setStatus(false);
                    userEntity.setCounter(0);
                    userDao.createUser(userEntity);
                    throw new BusinessWebAppException(MessageCatalog.USER_INACTIVE, 403);

                }
                //success and reset the counter if necessary
            }else{
                if(userEntity.getCounter() != 5){
                    userEntity.setCounter(5);
                    userDao.createUser(userEntity);
                }
            }


        }else{
            throw new BusinessWebAppException(MessageCatalog.USER_INACTIVE, 403);
        }


    }

    public List<UserDTO> getAll(){
        return userDao.getAll().stream()
                .map(userConverter::convertEntityDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(long id) {
        UserEntity user;
        try{
          user = userDao.getUserById(id);
        }catch (Exception e){
            throw new BusinessException(MessageCatalog.USER_WITH_THAT_ID_DOES_NOT_EXISTS);
        }
        return userConverter.convertEntityDTO(user);

    }
}
