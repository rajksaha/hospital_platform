package com.raydar.web.controller.prescription;

import com.raydar.common.SQL2OConnection;
import com.raydar.common.exception.RaydarException;
import com.raydar.mybatis.domain.prescription.drug.*;
import com.raydar.service.appointment.AppointmentService;
import com.raydar.service.prescription.PrescribedDrugsService;
import com.raydar.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by raj on 12/31/2016.
 */
@Controller
@RequestMapping("/drugs")
public class DrugController extends BaseController {

    public static String[] DATE_PARSE_PATTERN = {"MM/dd/yyyy", "MM-dd-yyyy", "MMddyyyy"};
    public final DateFormat formatter = new SimpleDateFormat(DATE_PARSE_PATTERN[2]);

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PrescribedDrugsService prescribedDrugsService;


    @RequestMapping(value = "/bringDrugDayType", method = RequestMethod.POST)
    public @ResponseBody
    List<DrugDayTypeData> bringDrugDayType(HttpServletRequest request) throws RaydarException{

        String sql = "SELECT `drugDayTypeID`, `textBD`, `textEng` FROM `drug_day_type` WHERE 1 = 1";

        SQL2OConnection sql2o = SQL2OConnection.getInstance();
        List<DrugDayTypeData> drugDayTypeDatas = sql2o.getConnection().createQuery(sql)
                .executeAndFetch(DrugDayTypeData.class);

        return drugDayTypeDatas;
    }

    @RequestMapping(value = "/bringDrugType", method = RequestMethod.POST)
    public @ResponseBody
    List<DrugTypeData> bringDrugType(HttpServletRequest request) throws RaydarException{

        String sql = "SELECT `drugTypeID`, `name`, `initial`, `unit`, `unitInitial`, `optionalUnitInitial` FROM `drug_type` WHERE 1 = 1";

        SQL2OConnection sql2o = SQL2OConnection.getInstance();
        List<DrugTypeData> drugTypeDatas = sql2o.getConnection().createQuery(sql)
                .executeAndFetch(DrugTypeData.class);

        return drugTypeDatas;
    }

    @RequestMapping(value = "/bringDrugWhenType", method = RequestMethod.POST)
    public @ResponseBody
    List<DrugWhenTypeData> bringDrugWhenType(HttpServletRequest request) throws RaydarException{

        String sql = "SELECT `drugWhenTypeID`, `textBD`, `textEng` FROM `drug_when_type` WHERE 1 = 1";

        SQL2OConnection sql2o = SQL2OConnection.getInstance();
        List<DrugWhenTypeData> drugWhenTypeDatas = sql2o.getConnection().createQuery(sql)
                .executeAndFetch(DrugWhenTypeData.class);

        return drugWhenTypeDatas;
    }

    @RequestMapping(value = "/bringDrugAdviceType", method = RequestMethod.POST)
    public @ResponseBody
    List<DrugAdviceData> bringDrugAdviceType(HttpServletRequest request) throws RaydarException{

        String sql =    "SELECT dat.drugAdviceID, dat.textBD, dat.textEng FROM `drug_advice_type` dat WHERE 1 = 1";

        SQL2OConnection sql2o = SQL2OConnection.getInstance();
        List<DrugAdviceData> drugAdviceDatas = sql2o.getConnection().createQuery(sql)
                .executeAndFetch(DrugAdviceData.class);

        return drugAdviceDatas;
    }

    @RequestMapping(value = {"/getItemForTypeHead/data/{data}/field/{field}"}, method = RequestMethod.GET)
    @ResponseBody
    public List<DrugData> getItemForTypeHead(@PathVariable("data") String data, @PathVariable("field") String field, HttpServletRequest request) throws RaydarException {

        Map<String, Object> params = new HashMap<>();
        params.put("drugName" , data);
        params.put("typeID" , field);
        return prescribedDrugsService.getDrugs(params);
    }

}
