// =================================================================================================
// Copyright (c) 2017-2020 BMW Group. All rights reserved.
// =================================================================================================
package msg.user;

import msg.exceptions.ExceptionMessage;

/**
 * A catalog of all the Messages thrown from the User component.
 *
 * @author msg-system ag;  Daniel Donea
 * @since 1.0
 */
public class MessageCatalog {

    /**
     * A message for the case when a user already exists with the same email.
     */
    public static final ExceptionMessage USER_WITH_SAME_MAIL_EXISTS
            = new ExceptionMessage("USER-01", "A user with the same email already exists.");

    /**
     * A message for the case when user credentials for login are incorrect
     */
    public static final ExceptionMessage USER_INVALID_USERNAME_OR_PASSWORD
            = new ExceptionMessage("USER-02", "Invalid username or password");

    /**
     * A message for the case when you specified an user id that doesn't exists in the database
     */
    public static final ExceptionMessage USER_WITH_THAT_ID_DOES_NOT_EXIST
            = new ExceptionMessage("USER-03", "There is no user with that id");

    public static final ExceptionMessage USER_INACTIVE
            = new ExceptionMessage("USER-04", "Your account is inactive");

    public static final ExceptionMessage THIS_ID_DOES_NOT_EXIST
            = new ExceptionMessage("PERMISSION-01", "The id you try to delete doesn't exist in database");

    public static final ExceptionMessage PERMISSION_NOT_FOUND
            = new ExceptionMessage("PERMISSION-02", "You don't have permission for this operation");

    public static final ExceptionMessage USER_INVALID_PATTERN
            = new ExceptionMessage("USER-05", "One or more fields have invalid pattern");

    public static final ExceptionMessage USER_FIELDS_MISSING
            = new ExceptionMessage("USER-06", "Some fields are missing");

   

    public static final ExceptionMessage INVALID_OR_NON_EXISTENT_TOKEN
            = new ExceptionMessage("USER-07", "You're not authorized for this operation.");

    public static final ExceptionMessage ROLE_WITH_SAME_PERMISSION_EXISTS
            = new ExceptionMessage("PERMISSION-03", "The permission u want to insert already exist!");
}



