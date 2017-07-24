package com.raydar.common.utility;


import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.Attachment;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class EchoFileUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(EchoFileUtils.class);


    public static String getContentRootForImages() {

        String fullDir = System.getProperty("catalina.base");

        // content.root should have a separator
        String contentRoot = "content";
        if (!contentRoot.startsWith(File.separator)) {
            fullDir += File.separator + "webapps" + File.separator + contentRoot;
        } else {
            fullDir += File.separator + "webapps" + contentRoot;
        }

        File file = new File(fullDir);
        if (!file.exists()) {
            file.mkdirs();
        }

        return fullDir;
    }

    public static String getContentRootForTempImages(String sessionID) {
        String path = getContentRootForImages() + File.separator + "temp" + File.separator + sessionID;
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        return path;
    }

    public static boolean copyImage(File fileContent, File filePath) {
        try {
            FileUtils.copyFile(fileContent, filePath);
            return true;
        } catch (IOException ex) {
            LOGGER.error("error saving image", ex);
            return false;
        }
    }

    public static Map<String, Object> saveFile(Attachment attachment) throws RaydarException {

        Map<String, Object> param = new HashMap<String, Object>();
        String url = getContentRootForImages();
        if (!url.endsWith(File.separator)) {
            url += File.separator;
        }

        String filePath = url + attachment.getAttachmentUrl();
        File tmpFile = retrieveFile(filePath);
        if (tmpFile.exists()) {

            String relativePath = File.separator + "files" +
                    File.separator + attachment.getEntityType() +
                    File.separator + attachment.getEntityId() +
                    File.separator + attachment.getLabel() + "." + attachment.getFileExt();
            String baseFilePath = getContentRootForImages() + relativePath;

            saveContentFile(tmpFile, baseFilePath);
            attachment.setAttachmentUrl(relativePath);
            if (tmpFile.exists()) {
                tmpFile.delete();
            }
        }

        return param;
    }

    public static boolean saveContentFile(File fileContent, String contentPath) {
        boolean flag = false;
        if (fileContent != null && fileContent.length() > 0 && contentPath != null && contentPath.length() > 0) {
            // contentDetail should contain file data and content url
            File filePath = new File(contentPath);
            if (filePath.exists()) {
                filePath.delete();
            }
            flag = copyImage(fileContent, filePath);
        }
        return flag;
    }

    public static File retrieveFile(String filePath) throws IllegalArgumentException {
        File file = null;
        try {
            File tmpFile = new File(filePath);
            if (tmpFile.exists()) {
                file = tmpFile;
            } else {
                file = null;
            }
        } catch (IllegalArgumentException illegalArgumentException) {
            LOGGER.error("Exception occurred while attempting to retrieve file", illegalArgumentException);
        }
        return file;
    }


}
