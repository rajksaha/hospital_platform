ALTER TABLE complain CHANGE id complainID INT(11) NOT NULL AUTO_INCREMENT;
TRUNCATE TABLE complain;
ALTER TABLE diagnosis CHANGE id diagnosisID INT(11) NOT NULL AUTO_INCREMENT;
TRUNCATE TABLE diagnosis;

ALTER TABLE symptom CHANGE symptomID id INT(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE next_visit_info
(
  nextVisitID INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  appointmentID INT NOT NULL,
  nextVisitType INT,
  date TIMESTAMP,
  numOfDay INTEGER,
  dayType INTEGER
);
CREATE UNIQUE INDEX next_visit_info_nextVisitID_uindex ON medical_platform.next_visit_info (nextVisitID);


CREATE TABLE `drug_day_type` (
  `drugDayTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `textBD` varchar(255) CHARACTER SET utf8 NOT NULL,
  `textEng` varchar(255) NOT NULL,
  PRIMARY KEY (`drugDayTypeID`)
);

CREATE TABLE `drug_type` (
  `drugTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `initial` varchar(10) NOT NULL,
  `unit` varchar(25) CHARACTER SET utf8 NOT NULL,
  `unitInitial` varchar(45) NOT NULL,
  `optionalUnitInitial` varchar(45) NOT NULL,
  PRIMARY KEY (`drugTypeID`),
  UNIQUE KEY `name` (`name`)
) ;

CREATE TABLE `drug_when_type` (
  `drugWhenTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `textBD` varchar(255) CHARACTER SET utf8 NOT NULL,
  `textEng` varchar(255) NOT NULL,
  PRIMARY KEY (`drugWhenTypeID`)
);

CREATE TABLE `drug_advice_type` (
  `drugAdviceID` int(11) NOT NULL AUTO_INCREMENT,
  `doctorType` int(11) NOT NULL,
  `textBD` text CHARACTER SET utf8 NOT NULL,
  `textEng` text NOT NULL,
  PRIMARY KEY (`drugAdviceID`)
);

INSERT INTO `drug_when_type`(`textBD`,`textEng`)VALUES('আহারের পরে','After Meal');
INSERT INTO `drug_when_type`(`textBD`,`textEng`)VALUES('আহারের পরে','30 Minutes Before Meal');
INSERT INTO `drug_when_type`(`textBD`,`textEng`)VALUES('আহারের পরে','Before Meal');
INSERT INTO `drug_when_type`(`textBD`,`textEng`)VALUES('আহারের পরে','Before Sleep');
INSERT INTO `drug_when_type`(`textBD`,`textEng`)VALUES('আহারের পরে','SOS');


INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Tablet', 'Tab', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Capsule', 'Cap', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Syrup', 'Syp', '1', 's', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Injection', 'Inj', '1', 'vial', 'ampl');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Suppository ', 'Supp', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Insulin ', 'Ins', '12', 'u', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Drop', 'Drop', '1', 'd', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Cream', 'Cream', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Inhaler ', 'Inh', '1', 'puff', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('IV-Infusion', 'IV', '1
', 'drp/min', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Spray', 'Spray', '1', 'puff', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Powder for Suspension', 'PFS', '1', 's', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('GEL', 'Gel', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Solution', 'SL.', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Pellets', 'PLT', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Oral Paste', 'OPT', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Ointment', 'OINT', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Aerosol Inhalation', 'ARI', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Lotion', 'Lotion', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Raw Materials', 'RM', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Hand Rub', 'HR', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Mouth Wash', 'MW', '1', 's', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Oral Saline', '', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Elixir', 'ELX', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Bolus ', 'Bolus ', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Sachet', 'Sachet', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Sached Powder ', 'SP', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Emulsion', 'Emulsion', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Shampoo', 'Shampoo', '1', '', '');
INSERT INTO drug_type (name, initial, unit, unitInitial, optionalUnitInitial) VALUES ('Vaccine', 'Vac', '1', '', '');
