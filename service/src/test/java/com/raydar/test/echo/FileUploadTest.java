package com.raydar.test.echo;

import com.raydar.common.exception.RaydarException;
import com.raydar.test.BaseTest;
import org.apache.commons.collections.CollectionUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 4/28/2016.
 */
public class FileUploadTest extends BaseTest {

    private static final Logger log = LoggerFactory.getLogger(FileUploadTest.class);




    @Test
    @Ignore
    public void uploadMissingOtcRawData()throws RaydarException, IOException{








        try {
        }catch (Exception e){
        }



    }
    @Test
    @Ignore
    public void checkForFiles() throws IOException{
        try {




            //}
        }catch (Exception e){
            log.error("Failed test", e);
            e.printStackTrace();
        }

    }


    private void handleArray(Integer number){

        if(number > 12){
            number = 12;
        }
        Integer divisor = number/4;
        if(number%4 ==0){
            divisor--;
        }
        Integer run = 0;
        for(Integer yIndex = 0; yIndex <= divisor; yIndex++){

            for(Integer xIndex = 0; xIndex < 4;xIndex++){
                if(run >= number){
                    System.out.print(0 + "|");
                }else{
                    System.out.print(run + "|");
                    run++;
                }

            }

            System.out.println();
        }
    }

}
