validator = {

	errors: [],
	defaultErrors: {},

	showFieldError: function($elementObj,message){
		$elementObj.closest(".form-group").addClass("has-error");
		$elementObj.closest(".form-group").find('.validationErrMsg').removeClass('hidden').html(message);
	},

	// check valid integer 1, 15, 18
	isInteger : function(val) {
		var re = new RegExp("^[0-9]+$");
		return re.test(val);
	},

	isAlphaNum : function(val) {
		var re = new RegExp("^[0-9a-zA-Z]+$");
		return re.test(val);
	},

	isDecimalRange: function(val, min, max) {
		val = val.replace(/,/g, '');
		if(!isNaN(val) && (val.length > 0)) {
			if(val >= parseInt(min) && val <= parseInt(max)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	},

	isIntRange: function(val, min, max) {
		var regx = new RegExp("^[0-9]+$");
		if(regx.test(val)) {
			if(parseInt(val) >= parseInt(min) && parseInt(val) <= parseInt(max)) {
				return true;
			} else {
				return false;
			}
		} else {
			if(isNaN(val) || (val.length == 0)) {
				return true;
			} else {
				return false;
			}
		}
	},

	// check valid decimal number 125, 125.50
	isDecimal : function(val) {
		val = val.replace(/,/g, '');
		return !isNaN(val) && (val.length > 0);
	},

	// check valid date mm/dd/yyyy
	isDate : function(val) {
		var dateaprts = val.split('/');
		var dt = new Date(dateaprts[2], dateaprts[0] - 1, dateaprts[1]);
		return (dt.getDate() == dateaprts[1] && dt.getMonth() == dateaprts[0] - 1 && dt.getFullYear() == dateaprts[2]);
	},

    // MM/yyyy format
    isExpDate : function(val) {
        var dateaprts = val.split('/');
        var dt = new Date(dateaprts[1], dateaprts[0] - 1, 1);
        return (dt.getMonth() == dateaprts[0] - 1 && dt.getFullYear() == dateaprts[1]);
    },

	// check valid email abc@yahoo.com
	isEmail : function(val) {
		var pattern  = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
		return pattern.test(val);
	},

	// check valid web adress www.kaitair.com
	isWebAdress : function(val) {
		// var pattern  = /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)[-a-z0-9]+.*)/i;
		//var pattern = /((?:^www\.)(?:[a-z0-9]+\.)[-a-z0-9]+.*)/i;
		var pattern = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/i;

		return pattern.test(val);
	},

	// check valid url www.url.com
	isUrl : function(val) {
	//	var pattern  = /([\w\.]+\.(?:com|cc|net|ru|org)[^,\s]*)/i;
		var pattern = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/i;

		return pattern.test(val);
	},

	getErrorMessage: function(control, errClass) {
		var msg = $(control).attr("errmsg") || validator.defaultErrors[errClass];
		validator.errors.push(msg);
	},

	markError : function(control, isValid, errorType) {
		if (isValid) {
			$(control).closest(".form-group").removeClass("has-error");
			$(control).closest(".form-group").find('.validationErrMsg').addClass("hidden");
			return 0;
		} else {
			$(control).closest(".form-group").find('.validationErrMsg').removeClass("hidden");
			var msg = validator.defaultErrors[errorType];
			var text = $(control).closest(".form-group").find('.validationErrMsg').html();
			if(text && text.trim() == "totalMillage"){
				msg = "Click the calculator button to calculate";
			}
			$(control).closest(".form-group").find('.validationErrMsg').html(msg);
			$(control).closest(".form-group").addClass("has-error");
			return 1;
		}
	},

	validateForm : function(_targetArea, _msgHolder, _msg) {

		var notValid = 0;
		var msgHolder = "#lblMsg";

		if (_targetArea) {
			targetArea = _targetArea;
		} else {
			targetArea = $(document);
		}

		if (_msg) {
			errMsg = _msg;
		}

		if (_msgHolder) {
			msgHolder = _msgHolder;
		}


		validator.errors = [];
		$(targetArea).find("input, select, textarea").each(function(i, ctrl) {
			


			if($(ctrl).hasClass("password")) {
				var hasError = 0;
				hasError = validator.markError(ctrl, ctrl.value.length > 0,"password");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "password");
				}
			}

			if($(ctrl).hasClass("email")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				hasError = validator.markError(ctrl, validator.isEmail(currValue), "email");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "email");
				}
			}

			if($(ctrl).hasClass("emailnr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				if (currValue.length > 0) {
					hasError = validator.markError(ctrl, validator.isEmail(currValue), "emailnr");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "emailnr");
				}
			}

			if($(ctrl).hasClass("url")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				hasError = validator.markError(ctrl, validator.isUrl(currValue), "url");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "url");
				}
			}

			if($(ctrl).hasClass("integer")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				hasError = validator.markError(ctrl, (validator.isInteger(currValue) && parseInt(currValue) > 0), "integer");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "integer");
				}
			}

			if($(ctrl).hasClass("integernr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				if (currValue.length < 1) {
					currValue = "0";
				}
				hasError = validator.markError(ctrl, validator.isInteger(currValue), "integernr");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "integernr");
				}
			}

			if($(ctrl).hasClass("alphaNum")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				hasError = validator.markError(ctrl, validator.isAlphaNum(currValue), "alphaNum");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "alphaNum");
				}
			}

			if($(ctrl).hasClass("alphaNumnr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				if (currValue.length < 1) {
					currValue = "0";
				}
				hasError = validator.markError(ctrl, validator.isAlphaNum(currValue), "alphaNumnr");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "alphaNumnr");
				}
			}

			if($(ctrl).hasClass("decrange")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				var minValue = $(ctrl).attr("minval");
				var maxValue = $(ctrl).attr("maxval");
				currValue = currValue.replace(/,/g, "");
				hasError = validator.markError(ctrl, validator.isDecimalRange(currValue, minValue, maxValue), "decrange");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "decrange");
				}
			}

			if($(ctrl).hasClass("intrange")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				var minValue = $(ctrl).attr("minval");
				var maxValue = $(ctrl).attr("maxval");
				currValue = currValue.replace(/,/g, "");
				// if value is blank then it will catch by required field
				if(isNaN(currValue) || (currValue.length == 0)) {
					return;
				}
				hasError = validator.markError(ctrl, validator.isIntRange(currValue, minValue, maxValue), "intrange");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "intrange");
				}
			}

			if($(ctrl).hasClass("decimal")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				var isValid = false;
				if(currValue == ""){
					hasError = validator.markError(ctrl, false, "decimal");
				} else {
					if ($(ctrl).hasClass('negative')){
						isValid = (validator.isDecimal(currValue) && parseFloat(currValue) != 0);
					}else{
						isValid = (validator.isDecimal(currValue) && parseFloat(currValue) >= 0);
					}
					hasError = validator.markError(ctrl, isValid, "decimal");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "decimal");
				}
			}

			if($(ctrl).hasClass("decimalnr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/,/g, "");
				if (currValue.length < 1) {
					currValue = "0";
				}
				hasError = validator.markError(ctrl, validator.isDecimal(currValue), "decimalnr");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "decimalnr");
				}
			}

			if($(ctrl).hasClass("date")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				hasError = validator.markError(ctrl, validator.isDate(currValue), "date");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "date");
				}
			}

			if($(ctrl).hasClass("datenr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				if (currValue.length > 0) {
					hasError = validator.markError(ctrl, validator.isDate(currValue), "datenr");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "datenr");
				}
			}

			if($(ctrl).hasClass("phn")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/-/g, "");
				currValue = currValue.replace(/\+/g, "");
				hasError = validator.markError(ctrl, (validator.isInteger(currValue) && parseInt(currValue) > 0), "phn");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "phn");
				}
			}
			
			if($(ctrl).hasClass("phnnr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				currValue = currValue.replace(/-/g, "");
				currValue = currValue.replace(/\+/g, "");
				if (currValue.length > 0) {
					hasError = validator.markError(ctrl, (validator.isInteger(currValue) && parseInt(currValue) > 0), "phnnr");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "phnnr");
				}
			}

			if($(ctrl).hasClass("website")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				hasError = validator.markError(ctrl, validator.isWebAdress(currValue), "website");
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "website");
				}
			}
			
			if($(ctrl).hasClass("websitenr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				if (currValue.length > 0) {
					hasError = validator.markError(ctrl, validator.isWebAdress(currValue), "websitenr");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "website");
				}
			}

			if($(ctrl).hasClass("expdatenr")) {
				var hasError = 0;
				var currValue = $.trim(ctrl.value);
				if (currValue.length > 0) {
					hasError = validator.markError(ctrl, validator.isExpDate(currValue), "expdatenr");
				} else {
					validator.markError(ctrl, true);      // clear error mark
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "expdatenr");
				}
			}

			if($(ctrl).hasClass("required")) {
				var hasError = 0;
				if($(ctrl).is("input")) {
					var currValue = $.trim(ctrl.value);
					hasError = validator.markError(ctrl, currValue.length > 0, "required");
				}
				if($(ctrl).is("textarea")) {
					var currValue = $.trim(ctrl.value);
					hasError = validator.markError(ctrl, currValue.length > 0, "required");
				}
				if($(ctrl).is("select")) {
					hasError = validator.markError(ctrl, ctrl.selectedIndex > 0, "required");
				}
				if(hasError > 0) {
					notValid += hasError;
					validator.getErrorMessage(ctrl, "required");
				}
			}

			if($(ctrl).hasClass("username")) {
				if(ctrl.value.length > 0){
					var hasError = 0;
					hasError = validator.markError(ctrl, !(/\W/.test(ctrl.value)),"username");
					if(hasError > 0) {
						notValid += hasError;
						validator.getErrorMessage(ctrl, "username");
					}

				}
			}

			if (typeof $(ctrl).attr("minlength") !== typeof undefined && $(ctrl).attr("minlength") !== false) {
				if(ctrl.value.length > 0 && $(ctrl).attr("minlength") > ctrl.value.length){
					var hasError = 0;
					hasError = validator.markError(ctrl, $(ctrl).attr("minlength") <= ctrl.value.length ,"minlength");
					if(hasError > 0) {
						notValid += hasError;
						validator.getErrorMessage(ctrl, "username");
					}

				}
			}




		});



		if (notValid > 0) {
			var msg = "Please enter required information";
			if(validator.errors.length > 0) {
				msg = validator.errors[0];
			}
			$(msgHolder).html(msg).parent().removeClass("hidden").addClass("alert-danger");
			if (! _targetArea) {
				$(document).scrollTop(0);
			}
			return false;
		}else {
			$(msgHolder).html("").addClass("hidden").removeClass("alert-danger");
			return true;
		}

	},

	isFormValid : function(_targetArea) {

		var notValid = 0;

		if (_targetArea) {
			targetArea = _targetArea;
		} else {
			targetArea = $(document);
		}

        $(targetArea).find("input.required").each(function(i) {
            var currValue = $.trim(this.value);
            notValid += ((currValue.length > 0) ? 0 : 1);
        });

		$(targetArea).find("textarea.required").each(function(i) {
			var currValue = $.trim(this.value);
			notValid += ((currValue.length > 0) ? 0 : 1);
		});

        $(targetArea).find("select.required").each(function(i) {
            notValid += ((this.selectedIndex > 0) ? 0 : 1);
        });

		$(targetArea).find("input.password").each(function(i) {
			notValid += ((this.value.length > 0) ? 0 : 1);
		});

		$(targetArea).find("input.email").each(function(i) {
			var currValue = $.trim(this.value);
			notValid += (validator.isEmail(currValue) ? 0 : 1);
		});

		$(targetArea).find("input.url").each(function(i) {
			var currValue = $.trim(this.value);
			notValid += (validator.isUrl(currValue) ? 0 : 1);
		});

		$(targetArea).find("input.emailnr").each(function(i) {
		   var currValue = $.trim(this.value);
		   if (currValue.length > 0) {
			   notValid += (validator.isEmail(currValue) ? 0 : 1);
		   }
		});

		$(targetArea).find("input.integer").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/,/g, "");
			notValid += ((validator.isInteger(currValue) && parseInt(currValue)) ? 0 : 1);
		});

		$(targetArea).find("input.alphaNum").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/,/g, "");
			notValid += (validator.isAlphaNum(currValue) ? 0 : 1);
		});

		$(targetArea).find("input.integernr").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/,/g, "");
			if (currValue.length < 1) {
				currValue = "0";
			}
			notValid += (validator.isInteger(currValue) ? 0 : 1);
		});

		$(targetArea).find("input.decrange").each(function(i) {
			var currValue = $.trim(this.value);
			var minValue = $(this).attr("minval");
			var maxValue = $(this).attr("maxval");
			currValue = currValue.replace(/,/g, "");
			notValid += ((validator.isDecimalRange(currValue, minValue, maxValue)) ? 0 : 1);
		});

		$(targetArea).find("input.intrange").each(function(i) {
			var currValue = $.trim(this.value);
			var minValue = $(this).attr("minval");
			var maxValue = $(this).attr("maxval");
			currValue = currValue.replace(/,/g, "");
			// if value is blank then it will catch by required field
			if(isNaN(currValue) || (currValue.length == 0)) {
				notValid += 0;
			} else {
				notValid += ((validator.isIntRange(currValue, minValue, maxValue)) ? 0 : 1);
			}
		});

		$(targetArea).find("input.decimal").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/,/g, "");
			var isValid = false;
			if ($(this).hasClass('negative'))
				isValid = (validator.isDecimal(currValue) && parseFloat(currValue) != 0);
			else
				isValid = (validator.isDecimal(currValue) && parseFloat(currValue) > 0);

			notValid += ((isValid == true) ? 0 : 1);
		});

		$(targetArea).find("input.decimalnr").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/,/g, "");
			if (currValue.length < 1) {
				currValue = "0";
			}
			notValid += ((validator.isDecimal(currValue)) ? 0 : 1);
		});

		$(targetArea).find("input.date").each(function(i) {
			var currValue = $.trim(this.value);
			notValid += ((validator.isDate(currValue)) ? 0 : 1);
		});

		$(targetArea).find("input.datenr").each(function(i) {
			var currValue = $.trim(this.value);
			if (currValue.length > 0) {
				notValid += ((validator.isDate(currValue)) ? 0 : 1);
			}
		});

        $(targetArea).find("input.expdatenr").each(function(i) {
            var currValue = $.trim(this.value);
            if (currValue.length > 0) {
                notValid += ((validator.isExpDate(currValue)) ? 0 : 1);
            }
        });

		$(targetArea).find("input.phn").each(function(i) {
			var currValue = $.trim(this.value);
			currValue = currValue.replace(/-/g, "");
			currValue = currValue.replace(/\+/g, "");
			if (currValue.length > 0) {
				notValid += ((validator.isInteger(currValue) && parseInt(currValue)) ? 0 : 1);
			}
		});

		$(targetArea).find("input.website").each(function(i) {
			var currValue = $.trim(this.value);

			if($(this).hasClass('required')){
				notValid += ((this, validator.isWebAdress(currValue)) ? 0 : 1);
			}else{
				if(currValue.length > 0){
					notValid += ((this, validator.isWebAdress(currValue)) ? 0 : 1);
				}
			}
		});


		if (notValid > 0) {
			return false;
		}else {
			return true;
		}

	},
    hideError: function(container) {
        if($(container)) {
            $(container).find('.validationErrMsg').addClass('hidden');
            $(container).find('.form-group').removeClass('has-error');
			$(container).find('.form-control').parents('.form-group').removeClass('has-error');
        }
    }

};

var keyHandler = {

	initIntegerFields: function() {
		$(document).on("keydown", "input.integer, input.intrange, input.integernr", function(event) {
			// Allow backspace, delete, >, <, enter, tab, etc.
			if ((event.keyCode == null) || (event.keyCode == 0) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode == 13) || (event.keyCode == 27) || (event.keyCode == 33) || (event.keyCode == 34) || (event.keyCode == 35) || (event.keyCode == 36) || (event.keyCode == 37) || (event.keyCode == 38) || (event.keyCode == 39) || (event.keyCode == 40) || (event.keyCode == 46)) {
			}
			else {
				// Ensure that it is a number and stop the keypress
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
				}
				else {
					event.preventDefault();
				}
			}
		});
	},

	initPhnFields: function() {
		$(document).on("keydown", "input.phn", function(event) {
			// Allow backspace, delete, >, <, enter, tab, etc.
			if ((event.keyCode == null) || (event.keyCode == 107) || (event.keyCode == 109) ||(event.keyCode == 0) || (event.keyCode == 8) ||
				(event.keyCode == 9) || (event.keyCode == 13) || (event.keyCode == 27) || (event.keyCode == 33) || (event.keyCode == 34) ||
				(event.keyCode == 35) || (event.keyCode == 36) || (event.keyCode == 37) || (event.keyCode == 38) || (event.keyCode == 39) ||
				(event.keyCode == 40) || (event.keyCode == 46) || (event.keyCode == 86) || (event.keyCode == 67) || (event.keyCode == 173) || (event.keyCode == 61)) {
			}
			else {
				// Ensure that it is a number and stop the keypress
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 16) {
				}else {
					event.preventDefault();
				}
			}
		});
	},

	initDates: function() {
		$(document).on("keydown", "input.date, input.datenr, input.expdatenr", function(event) {
			if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 ||
				event.keyCode == 46 || event.keyCode == 191 || (event.keyCode >= 48 && event.keyCode <= 57)){
				// Allow numbers, tab, backspace, delete, left & right arrow, and /
			}
			else {
				event.preventDefault();
			}
		});
	},

	initDecimalFields: function() {
		$(document).on("keydown", "input.decimal, input.decimalnr, input.decimalallowzero, input.decrange", function(event) {
			// Allow backspace, delete, >, <, enter, tab, etc.
			if ((event.keyCode == null) || (event.keyCode == 0) || (event.keyCode == 8) || (event.keyCode == 9) || (event.keyCode == 13) || (event.keyCode == 27) || (event.keyCode == 33) || (event.keyCode == 34) || (event.keyCode == 35) || (event.keyCode == 36) || (event.keyCode == 37) || (event.keyCode == 38) || (event.keyCode == 39) || (event.keyCode == 40) || (event.keyCode == 46) || (event.keyCode == 190) || (event.keyCode == 110) ||
					event.keyCode == 173 || event.keyCode == 109 || event.keyCode == 189 || event.keyCode == 86 || event.keyCode == 90 || event.keyCode == 67) {

				if ((event.keyCode == 190) || (event.keyCode == 110)) {
					var fieldValue = this.value;
					var fieldArray = fieldValue.split(/\./);
					if (fieldArray.length > 1) {
						event.preventDefault();
					}
				}
				if (event.keyCode == 109 || event.keyCode == 173 || event.keyCode == 189) {  // negative sign
					if (!$(this).hasClass('negative'))
						event.preventDefault();
					else
					{
						var fieldValue = this.value;
						var fieldArray = fieldValue.split(/-/);
						if (fieldArray.length > 1)
							event.preventDefault();
					}
				}
			}
			else {
				// Ensure that it is a number and stop the keypress
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
					//this.value = addCommas(this.value);
					var fieldValue = this.value;
					var fieldArray = fieldValue.split(/\./);
					/*if (fieldArray.length > 1) {
						if(fieldArray[1].length > 1) {
							event.preventDefault(); // should allow only 2 decimal places
						}
					}*/
				}
				else {
					event.preventDefault();
				}
			}
		});
	},
	initOnlyNumericFields: function() {
		$(document).on("keypress", "input.allow_numbers_and_decimal_point", function(evt) {
			var charCode = (evt.which) ? evt.which : evt.keyCode;
	          if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
	        	  evt.preventDefault();
		});
	}
};



$(document).ready(function() {

	keyHandler.initIntegerFields();
	keyHandler.initDecimalFields();
	keyHandler.initPhnFields();
	keyHandler.initDates();
	keyHandler.initOnlyNumericFields();

	validator.defaultErrors["required"] = "Required";
	validator.defaultErrors["password"] = "Please enter valid password";
	validator.defaultErrors["username"] = "Username can be letters, numbers, underscores and should have a minimum length of 5";
	validator.defaultErrors["email"] = "Please write a proper email address";
	validator.defaultErrors["emailnr"] = "Please write a proper email address";
	validator.defaultErrors["integer"] = "Please enter numeric value";
	validator.defaultErrors["integernr"] = "Please enter numeric value";
	validator.defaultErrors["alphaNum"] = "Please enter alphanumeric value";
	validator.defaultErrors["alphaNumnr"] = "Please enter alphanumeric value";
	validator.defaultErrors["decrange"] = "Please select a value which is greater then 0 and not more then 100";
	validator.defaultErrors["intrange"] = "Please enter numeric value";
	validator.defaultErrors["decimal"] = "Please enter decimal value";
	validator.defaultErrors["decimalnr"] = "Please enter decimal value";
	validator.defaultErrors["date"] = "Please enter valid date";
	validator.defaultErrors["datenr"] = "Please enter valid date";
	validator.defaultErrors["expdatenr"] = "Please enter valid date";
	validator.defaultErrors["phn"] = "Please enter phone number";
	validator.defaultErrors["phnnr"] = "Please enter phone number";
	validator.defaultErrors["url"] = "Please enter valid web address";
	validator.defaultErrors["website"] = "Please enter valid web address";
	validator.defaultErrors["websitenr"] = "Please enter valid web address";
	validator.defaultErrors["minlength"] = "Please provide the minimum length";

});
