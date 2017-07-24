package com.raydar.test.echo;

import org.bytedeco.javacpp.BytePointer;
import org.bytedeco.javacpp.lept;
import org.bytedeco.javacpp.tesseract;
import org.junit.Ignore;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * Created by raj on 10/10/2016.
 */
public class OCR {

    private static final Logger log = LoggerFactory.getLogger(FileUploadTest.class);

    @Test
    @Ignore
    public void checkForFiles() throws IOException {
        try {
            /*
             * ##################################################
             * Please note before run
             * This is a one time test run
             * Scheduler won't work here
             * For scheduler run the file-watcher module
             * #################################################
             */

            this.process("C:/Users/raj/Desktop/14483866_10155328908282576_691755952_n.jpg");
        }catch (Exception e){
            log.error("Failed test", e);
            e.printStackTrace();
        }

    }
    public String process(String file) {
        tesseract.TessBaseAPI api = new tesseract.TessBaseAPI();
        /*if (api.Init(".", "pol") != 0) {
            throw new RuntimeException("Could not initialize tesseract.");
        }*/

        lept.PIX image = null;
        BytePointer outText = null;
        try {
            image = lept.pixRead(file);
            api.SetImage(image);
            outText = api.GetUTF8Text();
            String string = outText.getString("UTF-8");
            if (string != null) {
                string = string.trim();
            }
            return string;
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("charset", e);
        } finally {
            if (outText != null) {
                outText.deallocate();
            }
            if (image != null) {
                lept.pixDestroy(image);
            }
            if (api != null) {
                api.End();
            }
        }
    }
}
