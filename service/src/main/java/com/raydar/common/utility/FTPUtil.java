package com.raydar.common.utility;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by raj on 10/22/2016.
 */
public class FTPUtil {

    private final static Logger LOGGER = LoggerFactory.getLogger(FTPUtil.class);


    public static void uploadFileToFtp(byte[] sourceBytes, String fileName, String parentDirectory, String subDirectory) throws Exception {
        FTPClient ftpClient = connectFTP(1, 3);

        //navigate to main working dir
        ftpClient.changeWorkingDirectory(parentDirectory);

        // upload file to ftp server
        if (!directoryExists(ftpClient, subDirectory)) {
            ftpClient.makeDirectory(subDirectory);
        }
        //navigate to data directory
        ftpClient.changeWorkingDirectory(subDirectory);

        InputStream sourceInput = new ByteArrayInputStream(sourceBytes);
        ftpClient.storeFile(fileName, sourceInput);

        // disconnect ftp
        ftpClient.logout();
        ftpClient.disconnect();
    }


    public static FTPClient connectFTP(Integer tryNumber, Integer maxFtpConnectionFailTry) throws IOException {

        FTPClient ftpClient = new FTPClient();;

        try {

            String server = EchoProperties.INSTANCE.getProperty("ftp.server");
            String user = EchoProperties.INSTANCE.getProperty("ftp.user");
            String pass = EchoProperties.INSTANCE.getProperty("ftp.password");

            ftpClient.connect(server);
            //showServerReply(ftpClient);
            int replyCode = ftpClient.getReplyCode();
            if (!FTPReply.isPositiveCompletion(replyCode)) {
                LOGGER.error("Operation failed. Server reply code: " + replyCode);
            }
            boolean success = ftpClient.login(user, pass);
            //showServerReply(ftpClient);
            if (!success) {
                LOGGER.error("Could not login to the server");
            } else {
                System.out.println("LOGGED IN SERVER TIMER connectFTP");
                ftpClient.enterLocalPassiveMode();
                ftpClient.setFileType(FTP.BINARY_FILE_TYPE);

            }
        } catch (Exception ex) {
            ex.printStackTrace();
            LOGGER.error("Oops! Something wrong happened in connectFTP! " + ex);
            if(tryNumber > maxFtpConnectionFailTry) {
                throw new IOException("Failed to connect to ftp server. Tried: " + maxFtpConnectionFailTry, ex);
            }
            ftpClient = null;
            connectFTP(tryNumber + 1, maxFtpConnectionFailTry);
        }
        return ftpClient;
    }

    //advisable to check servers reply code after each call
    private static void showServerReply(FTPClient ftpClient) {
        String[] replies = ftpClient.getReplyStrings();
        if (replies != null && replies.length > 0) {
            for (String aReply : replies) {
                LOGGER.debug("SERVER: " + aReply);
            }
        }
    }

    private static boolean directoryExists(FTPClient ftpClient, String dirPath) throws IOException {
        try{
            return ftpClient.changeWorkingDirectory(dirPath);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }
}
