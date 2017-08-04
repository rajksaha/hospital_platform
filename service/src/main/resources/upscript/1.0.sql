DROP TABLE IF EXISTS echo_user_profile;
CREATE TABLE echo_user_profile
(
  userProfileID INT(11) NOT NULL AUTO_INCREMENT,
  userID INT(11) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  employeeCode VARCHAR(45),
  emailAddress VARCHAR(100),
  lastWorkingDay TIMESTAMP,
  updatedBy VARCHAR(100),
  updatedOn TIMESTAMP,
  createdBy VARCHAR(100),
  createdOn TIMESTAMP,
  sex VARCHAR(45),
  start_time TIME,
  endTime TIME,
  dateOfBirth TIMESTAMP,
  fee DECIMAL(10),
  categoryID INT(11),
  phone VARCHAR(45),
  CONSTRAINT `PRIMARY` PRIMARY KEY (userProfileID, userID)
);
CREATE INDEX idx_user ON echo_user_profile (userID);
CREATE UNIQUE INDEX userID_UNIQUE ON echo_user_profile (userID);
CREATE UNIQUE INDEX userProfileID_UNIQUE ON echo_user_profile (userProfileID);