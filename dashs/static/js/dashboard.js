let ctx_FCL = document.getElementById('chart_FCL').getContext('2d');
let ctx_TURBIDITY = document.getElementById('chart_TURBIDITY').getContext('2d');
let ctx_pH = document.getElementById('chart_pH').getContext('2d');
let ctx_TDS = document.getElementById('chart_TDS').getContext('2d');
let ctx_EC = document.getElementById('chart_EC').getContext('2d');
let ctx_TEMP = document.getElementById('chart_TEMP').getContext('2d');

let result_datetime = [];
let result_datetime_label = [];

let result_FCL_input = [];
let result_FCL_output = [];
let result_FCL_supply = [];
let result_FCL_input_pre = [];
let result_FCL_output_pre = [];

let result_TURBIDITY_input = [];
let result_TURBIDITY_output = [];
let result_TURBIDITY_supply = [];
let result_TURBIDITY_input_pre = [];
let result_TURBIDITY_output_pre = [];

let result_pH_input = [];
let result_pH_output = [];
let result_pH_supply = [];
let result_pH_input_pre = [];
let result_pH_output_pre = [];

let result_TDS_input = [];
let result_TDS_output = [];
let result_TDS_supply = [];
let result_TDS_input_pre = [];
let result_TDS_output_pre = [];

let result_EC_input = [];
let result_EC_output = [];
let result_EC_supply = [];
let result_EC_input_pre = [];
let result_EC_output_pre = [];

let result_TEMP_input = [];
let result_TEMP_output = [];
let result_TEMP_supply = [];

let chart_FCL;
let chart_TURBIDITY;
let chart_pH;
let chart_TDS;
let chart_EC;
let chart_TEMP;

let bInit = true;
let selected_index_dong_prev = -1
let user_point_name;
let user_point_name2;

let loc_id;


let csrfmiddlewaretoken
let chart_duration = 0;

let water_condition;

let intervalChk;
let predictModel = 0;
let ajaxChk = false;
let temp_data_len = 1;
let temp_data_len2 = 1;

let time_status = "";
let facility_name_length = 0;
let loc_id_chk;

let maintenace_checed = false;

/*====================================================================================================*/
/*----------------------------------------------------------------------------------------------------*/
/*====================================================================================================*/
window.addEventListener("resize", function (event) {
    $(window).trigger("resize");

    // if ($(".gradient").height() < $(window).height()) {
    //     $(".gradient").css({ "height": $(window).height() });
    // }
    if ($(window).width() < 1080) {
        $(".term_form").show();
        $(".system_form").show();
    }
    if ($(window).width() >= 1080 && $(".term_form").show()) {
        $(".term_form").hide();
    }
    if ($(window).width() >= 1080 && $(".system_form").show()) {
        $(".system_form").hide();
    }
    if ($(window).width() > 1080){
        $(".term_form").css({'left':0,'top':0, 'position':'relative'});
        $(".system_form").css({'left':0,'top':0, 'position':'relative'});
    }
    if ($(window).width() >= 0) {
        $(".name_term").hide();
    }

    if((facility_name_length >10) && ($(window).width() > 650)){
        $(".facility .facility_name").css({'margin-top':'10px'})
        console.log("성립")
    }else{
        $(".facility .facility_name").css({'margin-top':'20px'})
        console.log("불성립")
    }

}, true);


function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/*====================================================================================================*/
/*----------------------------------------------------------------------------------------------------*/
/*====================================================================================================*/
$(document).ready(function () {

    init();

    // if ($(".gradient").height() < $(window).height()) {
    //     $(".gradient").css({ "height": $(window).height() });
    // }

    $(".btn_fullscreen").click(function () {
        toggleFullscreen();
    });
    /*====================================================================================================*/
    $(".btn_sensor_name.FCL").click(function () {
        $(".name_term").hide();
        $(".name_term.FCL").show();
        if ($(window).width() > 0){
            var $layerPopupObj2 = $('.name_term.FCL');
            var left = (($('.section').width() - $layerPopupObj2.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj2.height()) / 2 - $('.header').height()/2);
            $layerPopupObj2.css({'left':left,'top':top, 'position':'absolute'});
            $(".name_term.FCL").draggable({'cancel':'.accordion','containment':'.main'});
        }
    });
    $(".btn_sensor_name.TURBIDITY").click(function () {
        $(".name_term").hide();
        $(".name_term.TURBIDITY").show();
        if ($(window).width() > 0){
            var $layerPopupObj2 = $('.name_term.TURBIDITY');
            var left = (($(window).width() - $layerPopupObj2.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj2.height()) / 2 - $('.header').height());
            $layerPopupObj2.css({'left':left,'top':top, 'position':'absolute'});
            $(".name_term.TURBIDITY").draggable({'cancel':'.accordion','containment':'.main'});
        }
    });
    $(".btn_sensor_name.pH").click(function () {
        $(".name_term").hide();
        $(".name_term.pH").show();
        if ($(window).width() > 0){
            var $layerPopupObj2 = $('.name_term.pH');
            var left = (($('.section').width() - $layerPopupObj2.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj2.height()) / 2 - $('.header').height());
            $layerPopupObj2.css({'left':left,'top':top, 'position':'absolute'});
            $(".name_term.pH").draggable({'cancel':'.accordion','containment':'.main'});
        }
    });
    $(".btn_sensor_name.TDS").click(function () {
        $(".name_term").hide();
        $(".name_term.TDS").show();
        if ($(window).width() > 0){
            var $layerPopupObj2 = $('.name_term.TDS');
            var left = (($('.section').width() - $layerPopupObj2.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj2.height()) / 2 - $('.header').height());
            $layerPopupObj2.css({'left':left,'top':top, 'position':'absolute'});
            $(".name_term.TDS").draggable({'cancel':'.accordion','containment':'.main'});
        }
    });
    $(".btn_sensor_name.EC").click(function () {
        $(".name_term").hide();
        $(".name_term.EC").show();
        if ($(window).width() > 0){
            var $layerPopupObj2 = $('.name_term.EC');
            var left = (($('.section').width() - $layerPopupObj2.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj2.height()) / 2 - $('.header').height());
            $layerPopupObj2.css({'left':left,'top':top, 'position':'absolute'});
            $(".name_term.EC").draggable({'cancel':'.accordion','containment':'.main'});
        }
    });
    $(".btn_name_term_close").click(function () {
        $(".name_term").hide();
    });
    /*====================================================================================================*/
    $(".acc_title").click(function () {
        $(this).next(".acc_content").stop().slideToggle(200);
        $(this).toggleClass("on").siblings().removeClass("on");
        $(this).next(".acc_content").siblings(".acc_content").slideUp(200);
    });

    $(".term_body .btn_show_term").click(function () {
        $(".term_form").show();
        
        if ($(window).width() > 1080){
            var $layerPopupObj = $('.term_form');
            var left = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj.height()) / 2 );
            $layerPopupObj.css({'left':left,'top':top, 'position':'absolute'});
            $(".term_form").draggable({'cancel':'.accordion','containment':'.main'});
        } 
        $(".system_form").hide();
    });

    $(".term_body .btn_close_term").click(function () {
        $(".term_form").hide();
        $(".acc_title").next(".acc_content").siblings(".acc_content").slideUp(200)
    });

    $(".term_body .btn_show_system").click(function () {
        $(".system_form").show();
        if ($(window).width() > 1080){
            var $layerPopupObj = $('.system_form');
            var left = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
            var top = ( $(window).scrollTop() + ($(window).height() - $layerPopupObj.height()) / 2 );
            $layerPopupObj.css({'left':left,'top':top, 'position':'absolute'});
            $(".system_form").draggable({'cancel':'.accordion','containment':'.main'});
        }
        $(".term_form").hide();
    });

    $(".term_body .btn_close_system").click(function () {
        $(".system_form").hide();
    });
    /*====================================================================================================*/
 
    /*====================================================================================================*/
    $("#select_region_si").change(function () {
        var selected_index_si = document.getElementById("select_region_si").selectedIndex;
        var selected_index_gu = 0;

        $('#select_region_gu').empty();
        $('#select_region_dong').empty();

        get_region_data(selected_index_si, selected_index_gu);
    });

    $("#select_region_gu").change(function () {
        var selected_index_si = document.getElementById("select_region_si").selectedIndex;
        var selected_index_gu = document.getElementById("select_region_gu").selectedIndex;

        $('#select_region_dong').empty();
        get_region_data(selected_index_si, selected_index_gu);
    });

    $("#select_region_dong").click(function () {
        $("#select_region_dong").change()
    });

    $("#select_region_dong").change(function () {
        get_public_water_data();
        document.getElementById("select_region_dong").selectedIndex = document.getElementById("select_region_dong").selectedIndex;
    });

    /*====================================================================================================*/
    $(".logout a").click(function () {
        $.ajax({
            type: "POST",
            url: '../logout/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
            },
            dataType: "json",
            success: function (data) {
                location.replace('/');
            },
            error: function (error) {
                console.log(error);
                location.replace('/');
            }
        });
    });
    /*====================================================================================================*/
    $(".info a").click(function () {
        $(".info_form").show();
        document.getElementById("change_installed_location").selectedIndex = loc_id - 1;

    });

    $("#btn_change_PW_submit").click(function () {
        var user_curr_password = $("#change_PW_user_curr_password").val();
        var user_new_password = $("#change_PW_user_new_password").val();
        var user_new_password_confirm = $("#change_PW_user_new_password_confirm").val();

        $.ajax({
            type: "POST",
            url: '../change_PW/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'user_curr_password': user_curr_password,
                'user_new_password': user_new_password,
                'user_new_password_confirm': user_new_password_confirm,
            },
            dataType: "json",
            success: function (data) {
                alert(data.msg);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $(".info_form .confirm").click(function () {
        var user_curr_password = $("#change_PW_user_curr_password").val();
        var new_loc_id = document.getElementById("change_installed_location").selectedIndex + 1;

        $.ajax({
            type: "POST",
            url: '../change_member_info/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'user_curr_password': user_curr_password,
                'new_loc_id': new_loc_id,
            },
            dataType: "json",
            success: function (data) {
                alert(data.msg);
                if (data.result) {
                    $(".info_form").hide();
                    location.reload(true);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $(".info_form .cancle").click(function () {
        $(".info_form").hide();
    });
    /*====================================================================================================*/
    $("#select_chart_duration").change(function () {
        $(".chart_loading").css("display","block");
        $(".chart_info_title").css("display","none");
        $(".chart_info .combobox").css("display","none");
        update_chart();
    });
    /*====================================================================================================*/

    /*====================================================================================================*/
    function init() {
        csrfmiddlewaretoken = $("#csrfmiddlewaretoken").val();
        get_predict_model();
        clock();
        get_user_info();
        get_water_condition();

        get_weather_data();
        get_region_data(0, 0);

        draw_chart();

        setInterval(clock, 1000);
        setInterval(get_weather_data, 30 * 60 * 1000);
        setInterval(get_water_condition, 5 * 1000);
        setInterval(get_predict_model, 5 * 1000);

        intervalChk = setInterval(update_chart, 3 * 1000);
    }
    /*====================================================================================================*/
    function clock() {
        var date = new Date();
        var month = date.getMonth();
        var clockDate = date.getDate();
        var day = date.getDay();
        var week = ["일", "월", "화", "수", "목", "금", "토"];
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        $(".date").text(`${month + 1}월 ${clockDate}일 ${week[day]}요일`);
        $(".hms").text(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);   
    }
    /*====================================================================================================*/
    function get_user_info() {
        $.ajax({
            type: "POST",
            url: '../get_user_info/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
            },
            dataType: "json",

            success: function (data) {

                // alert(data.point_info.dongcode);
                $(".member .id").html(data.user_name + " /");
                $(".bldg_name").html("[ " + data.loc_name + " ]");
                $(".k_water .region").html(data.point_info.point_si + " " + data.point_info.point_gu + " " + data.point_info.point_dong);
                $("#text_point_name").html(data.point_info.point_name);
                console.log(data.point_info.point_name);
                $(".facility_name").html(data.point_info.point_name);

                facility_name_length = data.point_info.point_name.length;
                if(facility_name_length >10){
                    $(".facility .facility_name").css({'margin-top':'10px'});
                    $(".sensor .facility_value").css({'padding':'0 0 0 0'});
                    
                }
                
                if(data.water_status_isNull_msg != ""){
                    alert(data.water_status_isNull_msg);
                }
                loc_id = data.loc_id
                user_point_name = data.point_info.point_name;
                user_point_name2 = data.point_info.point_name2;
                get_building_water_data();
                get_public_water_data();
                get_installed_location_info();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    /*====================================================================================================*/
    function get_installed_location_info() {
        var csrfmiddlewaretoken = $("#csrfmiddlewaretoken").val();
        $.ajax({
            type: "POST",
            url: '../get_installed_location_info/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
            },
            dataType: "json",
            success: function (data) {
                if (data.result == true) {
                    var installed_location_json = JSON.parse(data.installed_location_info);

                    $.each(installed_location_json, function (key, value) {
                        $('#change_installed_location').append('<option value="' + value.fields.loc_id + '">' + value.fields.loc_name + '</option>');
                    });
                }
                else {
                    // alert(data.msg);
                    // location.reload();
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    /*====================================================================================================*/
    function get_weather_data() {

        $.ajax({
            type: "POST",
            url: '../get_weather_data/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
            },
            dataType: "json",
            success: function (data) {
                $("#text_temperature").html(data.weather_info.temperature);
                $("#text_humidity").html(data.weather_info.humidity);
                $("#text_precipitation").html(data.weather_info.precipitation);
                $("#text_wind_speed").html(data.weather_info.wind_speed);

                $(".area .location").html(data.region_address.region_1depth_name + ' ' + data.region_address.region_2depth_name + ' ' + data.region_address.region_3depth_name);

                let description = data.weather_info.description;
                // console.log(parseInt(description))

                if (description == "01d" || description == "01n") {
                    $(".weather_time .description").html("맑음");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/clear.png" })
                }
                else if (description == "02d" || description == "02n") {
                    $(".weather_time .description").html("구름 조금");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/partly_cloudy.png" })
                }
                else if (description == "03d" || description == "03n") {
                    $(".weather_time .description").html("구름 많음");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/mostly_cloudy.png" })
                }
                else if (description == "04d" || description == "04n") {
                    $(".weather_time .description").html("흐림");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/cloudy.png" })
                }
                else if (description == "09d" || description == "09n" || description == "10d" || description == "10n" || description == "11d" || description == "11n") {
                    $(".weather_time .description").html("비");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/rain.png" })
                }
                else if (description == "13d" || description == "13n") {
                    $(".weather_time .description").html("눈");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/snow.png" })
                }
                else if (description == "50d" || description == "50n") {
                    $(".weather_time .description").html("안개");
                    $(".weather_time .img_weather").css({ "background-image": "url(../static/img/cloudy.png" })
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    /*====================================================================================================*/
    function get_region_data(selected_index_si, selected_index_gu) {
        $.ajax({
            type: "POST",
            url: '../get_region_data/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'selected_index_si': selected_index_si,
                'selected_index_gu': selected_index_gu,
            },
            dataType: "json",
            success: function (data) {
                if ($('#select_region_si option').length == 0) {
                    data.si_list.forEach(element => {
                        $('#select_region_si').append('<option value="' + element + '">' + element + '</option>');
                    });
                }

                if ($('#select_region_gu option').length == 0) {
                    data.gu_list.forEach(element => {
                        $('#select_region_gu').append('<option value="' + element + '">' + element + '</option>');
                    });
                }

                if ($('#select_region_dong option').length == 0) {
                    data.dong_list.forEach(element => {
                        $('#select_region_dong').append('<option value="' + element[1] + '">' + element[0] + '</option>');
                    });
                }

                // $("#select_region_dong").change();
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    /*====================================================================================================*/
    function get_building_water_data() {
        let point_name = user_point_name;

        $.ajax({
            type: "POST",
            url: '../get_public_water_data/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'point_name': point_name,
            },
            dataType: "json",

            success: function (data) {
                $(".FCL .facility_name").html(data.water_quality_result.point_name);
                $(".TURBIDITY .facility_name").html(data.water_quality_result.point_name);
                $(".pH .facility_name").html(data.water_quality_result.point_name);
                $(".TDS .facility_name").html(data.water_quality_result.point_name);
                $(".EC .facility_name").html(data.water_quality_result.point_name);
                $(".TEMP .facility_name").html(data.water_quality_result.point_name);
                
                let tmp = parseFloat(data.water_quality_result.FCL).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".FCL .facility_value_dp").html(parseFloat(data.water_quality_result.FCL).toFixed(2).toString());
                }
                else
                {
                    $(".FCL .facility_value_dp").html("-");
                }

                tmp = parseFloat(data.water_quality_result.TURBIDITY).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".TURBIDITY .facility_value_dp").html(parseFloat(data.water_quality_result.TURBIDITY).toFixed(2).toString());
                }
                else
                {
                    $(".TURBIDITY .facility_value_dp").html("-");
                }

                tmp = parseFloat(data.water_quality_result.pH).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".pH .facility_value_dp").html(parseFloat(data.water_quality_result.pH).toFixed(1).toString());
                }
                else
                {
                    $(".pH .facility_value_dp").html("-");
                }

                tmp = parseFloat(data.water_quality_result.TDS).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".TDS .facility_value_dp").html(parseFloat(data.water_quality_result.TDS).toFixed(0).toString());
                }
                else
                {
                    $(".TDS .facility_value_dp").html("-");
                } 

                tmp = parseFloat(data.water_quality_result.EC).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".EC .facility_value_dp").html(parseFloat(data.water_quality_result.EC).toFixed(0).toString());
                }
                else
                {
                    $(".EC .facility_value_dp").html("-");
                }
                
                tmp = parseFloat(data.water_quality_result.TEMP).toFixed(2).toString()
                if(tmp != "NaN")
                {
                    $(".TEMP .facility_value_dp").html(parseFloat(data.water_quality_result.TEMP).toFixed(1).toString());
                }
                else
                {
                    $(".TEMP .facility_value_dp").html("-");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function get_public_water_data() {
        let point_name;
        if (bInit) {
            bInit = false;
            point_name = user_point_name2;
        }
        else {
            $(".k_water .region").html($("#select_region_si option:selected").text() + " " + $("#select_region_gu option:selected").text() + " " + $("#select_region_dong option:selected").text());
            point_name = $("#select_region_dong").val();
        }


        $.ajax({
            type: "POST",
            url: '../get_public_water_data/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'point_name': point_name,
            },
            dataType: "json",

            success: function (data) {

                $("#text_point_name").html(data.water_quality_result.point_name);
                $("#text_FCL").html(data.water_quality_result.FCL);
                $("#text_TURBIDITY").html(data.water_quality_result.TURBIDITY);
                $("#text_pH").html(data.water_quality_result.pH);
                $("#text_TDS").html(data.water_quality_result.TDS);
                $("#text_EC").html(data.water_quality_result.EC);
                $("#text_TEMP").html(data.water_quality_result.TEMP);

                const split_dt = data.water_quality_result.occurrence_datetime.split('T');
                const split_date = split_dt[0].split('-');
                const split_hms = split_dt[1].split(':');

                datetime_tz = new Date(split_date[0], split_date[1] - 1, split_date[2], parseInt(split_hms[0]) + 9, split_hms[1])

                let hour = datetime_tz.getHours();
                let update_time = ""

                // console.log(hour)
                // console.log(typeof(hour))

                if (hour > 12 && hour < 24)
                    update_time = (split_date + ". 오후 " + (hour - 12).toString());
                else if (hour == 12)
                    update_time = (split_date + ". 오후 " + "12");
                else if (hour == 24)
                    update_time = (split_date + ". 오전 " + "0");
                else
                    update_time = (split_date + ". 오전 " + hour);

                $(".k_water .update_time").html(update_time + "시 기준");
                // 2021. 12. 7 12시 기준
                let cnt_warning = 0;
                let cnt_danger = 0;
                let result = [];

                result = judge_water_status("#result_FCL", data.water_quality_result.FCL, 
                    cnt_warning, cnt_danger,
                    water_condition[0].fields.FCL_caution1_upper, water_condition[0].fields.FCL_caution1_lower,
                    water_condition[0].fields.FCL_caution2_upper, water_condition[0].fields.FCL_caution2_lower, 
                    water_condition[0].fields.FCL_serious_upper, water_condition[0].fields.FCL_serious_lower);
    
                cnt_warning = result[0];
                cnt_danger = result[1];
                result = judge_water_status("#result_TURBIDITY", data.water_quality_result.TURBIDITY,
                    cnt_warning, cnt_danger,
                    water_condition[0].fields.TURBIDITY_caution1_upper, water_condition[0].fields.TURBIDITY_caution1_lower,
                    -1, -1, 
                    water_condition[0].fields.TURBIDITY_serious_upper, -1);

                cnt_warning = result[0];
                cnt_danger = result[1];
                result = judge_water_status("#result_pH", data.water_quality_result.pH,
                    cnt_warning, cnt_danger,
                    water_condition[0].fields.pH_caution1_upper, water_condition[0].fields.pH_caution1_lower,
                    water_condition[0].fields.pH_caution2_upper, water_condition[0].fields.pH_caution2_lower, 
                    water_condition[0].fields.pH_serious_upper, water_condition[0].fields.pH_serious_lower);

                cnt_warning = result[0];
                cnt_danger = result[1];
                result = judge_water_status("#result_TDS", data.water_quality_result.TDS, 
                    cnt_warning, cnt_danger,
                    water_condition[0].fields.TDS_caution1_upper, water_condition[0].fields.TDS_caution1_lower,
                    water_condition[0].fields.TDS_caution2_upper, water_condition[0].fields.TDS_caution2_lower, 
                    water_condition[0].fields.TDS_serious_upper, water_condition[0].fields.TDS_serious_lower);

                cnt_warning = result[0];
                cnt_danger = result[1];
                result = judge_water_status("#result_EC", data.water_quality_result.EC,
                    cnt_warning, cnt_danger,
                    water_condition[0].fields.EC_caution1_upper, water_condition[0].fields.EC_caution1_lower,
                    water_condition[0].fields.EC_caution2_upper, water_condition[0].fields.EC_caution2_lower, 
                    water_condition[0].fields.EC_serious_upper, water_condition[0].fields.EC_serious_lower);

                // cnt_warning = result[0];
                // cnt_danger = result[1];
                // result = judge_water_status("#result_TEMP", data.water_quality_result.TEMP, 
                //     cnt_warning, cnt_danger,
                //     -10000, -10000,-10000, -10000, -10000, -10000);
                // cnt_warning = result[0];
                // cnt_danger = result[1];

                if (cnt_danger > 0) {
                    $(".k_water .status").html("심각");
                    $(".k_water .status").css({"color":"rgb(200, 0, 0)","animation":" blinker 1s linear infinite"});
                    $(".k_water .img_result").css({ "background-image": "url(../static/img/result_r.png)" });
                }
                else {
                    if (cnt_warning > 0) {
                        $(".k_water .status").html("주의");
                        $(".k_water .status").css({"color": "rgb(255, 153, 0)","animation" : " none "});
                        $(".k_water .img_result").css({ "background-image": "url(../static/img/result_o.png)" });
                    }
                    else {
                        $(".k_water .status").html("적합");
                        $(".k_water .status").css({"color": "rgb(84, 130, 54)","animation" : " none "});
                        $(".k_water .img_result").css({ "background-image": "url(../static/img/result_g.png)" });
                    }
                }

                if( 0 == (data.water_quality_result.FCL || data.water_quality_result.EC
                    || data.water_quality_result.pH || data.water_quality_result.FCL
                    || data.water_quality_result.TURBIDITY)){
                        $(".k_water .status").html("NA");
                        $(".k_water .status").css({"color": "rgb(84, 130, 54)","animation" : " none "});
                        $(".k_water .img_result").css({ "background-image": "url(../static/img/result_g.png)" });
                        $("#result_EC").html("NA");
                        $("#result_EC").css({"color": "rgb(111, 111, 111)"});
                        $("#result_FCL").html("NA");
                        $("#result_FCL").css({"color": "rgb(111, 111, 111)"});
                        $("#result_TURBIDITY").html("NA");
                        $("#result_TURBIDITY").css({"color": "rgb(111, 111, 111)"});
                        $("#result_pH").html("NA");
                        $("#result_pH").css({"color": "rgb(111, 111, 111)"});
                        $("#result_TDS").html("NA");
                        $("#result_TDS").css({"color": "rgb(111, 111, 111)"});

                    }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    // /*====================================================================================================*/
    // function judge_water_status(index, value, lower_bounding, upper_bounding, warning_cut, danger_cut, cnt_warning, cnt_danger) {
    //     let n_val = parseFloat(value);
    //     if (!isNaN(n_val)) {
    //         if (lower_bounding <= n_val && n_val <= upper_bounding) {
    //             $(index).html("적합");
    //             $(index).css({"color": "rgb(0, 176, 80)"});
    //         }
    //         else if (warning_cut <= n_val  && n_val <= danger_cut) {
    //             $(index).html("주의");
    //             $(index).css({"color": "rgb(255, 153, 0)"});
    //             cnt_warning++;
    //         }
    //         else {
    //             $(index).html("심각");
    //             $(index).css({"color":"rgb(200, 0, 0)"});
    //             cnt_danger++;
    //         }
    //     }
    //     else {
    //         $(index).html("-");
    //         $(index).css("color", "rgb(150, 150, 150)");
    //     }

    //     return [cnt_warning, cnt_danger]
    // }

    /*====================================================================================================*/
    function get_water_condition() {
        $.ajax({
            type: "POST",
            url: '../get_water_condition/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
            },
            dataType: "json",
            success: function (data) {
                water_condition = JSON.parse(data.water_condition_info);
                // console.log(water_condition)

            },
            error: function (error) {
                console.log(error);
                water_condition = 0
            }
        });
    }

    function judge_water_status(index, value, cnt_warning, cnt_danger, caution1_upper, caution1_lower, caution2_upper, caution2_lower, serious_upper, serious_lower) {
        let n_val = parseFloat(value);


        if ((!isNaN(n_val) &&  loc_type != 5) || (!isNaN(n_val) &&  (loc_type == 5 && !index.includes('result_in')))) {
            if (n_val > caution1_lower && n_val < caution1_upper) {
                $(index).html("주의");
                $(index).css({"color": "rgb(255, 153, 0)"});
                cnt_warning++;
            }
            else if (n_val > caution2_lower && n_val < caution2_upper) {
                $(index).html("주의");
                $(index).css({"color": "rgb(255, 153, 0)"});
                cnt_warning++;
            }
            else if (n_val >= serious_upper || n_val <= serious_lower) {
                $(index).html("심각");
                $(index).css({"color":"rgb(200, 0, 0)"});
                cnt_danger++;
            }
            else {
                $(index).html("적합");
                $(index).css({"color": "rgb(0, 176, 80)"});
            }
            // if (lower_bounding <= n_val && n_val <= upper_bounding) {
            //     $(index).html("적합");
            //     $(index).css({"color": "rgb(0, 176, 80)"});
            // }
            // else if (warning_cut <= n_val  && n_val <= danger_cut) {
            //     $(index).html("주의");
            //     $(index).css({"color": "rgb(255, 153, 0)"});
            //     cnt_warning++;
            // }
            // else {
            //     $(index).html("심각");
            //     $(index).css({"color":"rgb(200, 0, 0)"});
            //     cnt_danger++;
            // }
        }
        else {
            $(index).html("-");
            $(index).css("color", "rgb(150, 150, 150)");
        }

        return [cnt_warning, cnt_danger]
    }
    /*====================================================================================================*/
    function get_chart_data() {
        if(!ajaxChk){
            ajaxChk = true;
            var select_chart_duration = document.getElementById("select_chart_duration");
            var chart_duration = select_chart_duration.options[select_chart_duration.selectedIndex].value;
            var forecast = $('#forecastCheck').is(':checked');
            
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();
            let hour = now.getHours() - 1;

            datetime_start = year + pad(month, 2) + pad(date - 1, 2) + pad(hour, 2);
            
            $.ajax({
                type: "POST",
                url: '../get_chart_data/',
                data:
                {
                    'csrfmiddlewaretoken': csrfmiddlewaretoken,
                    'point_name': user_point_name,
                    'chart_duration' : chart_duration, 
                    'forecast' : forecast
                },
                dataType: "json",
                success: function (data) {
                    try{
                        chart_info_json = JSON.parse(data.chart_info);
                        supply_info_json = data.supply_info;
                        predict_result = data.predict_result;
                        predictModel = data.predict_model;
                        
                        loc_id_chk = data.loc_id;

                        result_datetime = [];
                        result_datetime_su = [];
                        result_datetime_label = [];
                        result_minutes =[];
                        k = [0];
                        let numbering = 0;

                        result_FCL_input = [];
                        result_FCL_output = [];
                        result_FCL_supply = [];
                        result_FCL_input_pre =[];
                        result_FCL_output_pre = [];

                        result_TURBIDITY_input = [];
                        result_TURBIDITY_output = [];
                        result_TURBIDITY_supply = [];
                        result_TURBIDITY_input_pre = [];
                        result_TURBIDITY_output_pre = [];

                        result_pH_input = [];
                        result_pH_output = [];
                        result_pH_supply = [];
                        result_pH_input_pre = [];
                        result_pH_output_pre = [];

                        result_TDS_input = [];
                        result_TDS_output = [];
                        result_TDS_supply = [];
                        result_TDS_input_pre = [];
                        result_TDS_output_pre = [];

                        result_EC_input = [];
                        result_EC_output = [];
                        result_EC_supply = [];
                        result_EC_input_pre = [];
                        result_EC_output_pre = [];

                        result_TEMP_input = [];
                        result_TEMP_output = [];
                        result_TEMP_supply = [];
                        
                        room_temp = [];
                        room_hum = [];                

                        chart_info_json.forEach((item) => {
                            // result_datetime.push(item.fields.occurrence_datetime);

                            item.fields.occurrence_datetime

                            result_datetime.push(item.fields.occurrence_datetime);
                            // console.log(result_datetime);

                            result_FCL_input.push(parseFloat(item.fields.FCL_input).toFixed(3));
                            result_FCL_output.push(parseFloat(item.fields.FCL_output).toFixed(3));

                            result_TURBIDITY_input.push(parseFloat(item.fields.TURBIDITY_input).toFixed(3));
                            result_TURBIDITY_output.push(parseFloat(item.fields.TURBIDITY_output).toFixed(3));

                            result_pH_input.push(parseFloat(item.fields.pH_input).toFixed(3));
                            result_pH_output.push(parseFloat(item.fields.pH_output).toFixed(3));

                            result_TDS_input.push(parseFloat(item.fields.TDS_input).toFixed(3));
                            result_TDS_output.push(parseFloat(item.fields.TDS_output).toFixed(3));

                            result_EC_input.push(parseFloat(item.fields.EC_input).toFixed(3));
                            result_EC_output.push(parseFloat(item.fields.EC_output).toFixed(3));

                            result_TEMP_input.push(parseFloat(item.fields.TEMP_input).toFixed(3));
                            result_TEMP_output.push(parseFloat(item.fields.TEMP_output).toFixed(3));

                            room_temp.push(parseFloat(item.fields.room_temp).toFixed(1));
                            room_hum.push(parseFloat(item.fields.room_hum).toFixed(1));
                        
                            const split_dt = result_datetime[result_datetime.length-1].split('T');
                            const split_hms = split_dt[1].split(':');
                            result_minutes.push(split_hms[1])
                        })
                        // console.log("총데이터 갯수",result_datetime.length);

                        // 예측 데이터

                        predict_result.forEach((item) => {
                            const pre_data_fclIn = {};
                            const pre_data_fclOut = {};
                            const pre_data_phIn = {};
                            const pre_data_phOut = {};
                            const pre_data_tbIn = {};
                            const pre_data_tbOut = {};
                            const pre_data_ecIn = {};
                            const pre_data_ecOut = {};
                            const pre_data_tdsIn = {};
                            const pre_data_tdsOut = {};

                            pre_data_fclIn['x'] = item.date;
                            pre_data_fclIn['y'] = parseFloat(item.fclIn).toFixed(3)
                            pre_data_fclOut['x'] = item.date;
                            pre_data_fclOut['y'] = parseFloat(item.fclOut).toFixed(3)
                            result_FCL_input_pre.push(pre_data_fclIn);
                            result_FCL_output_pre.push(pre_data_fclOut);

                            pre_data_phIn['x'] = item.date;
                            pre_data_phIn['y'] = parseFloat(item.phIn).toFixed(3)
                            pre_data_phOut['x'] = item.date;
                            pre_data_phOut['y'] = parseFloat(item.phOut).toFixed(3)
                            result_pH_input_pre.push(pre_data_phIn);
                            result_pH_output_pre.push(pre_data_phOut);

                            pre_data_tbIn['x'] = item.date;
                            pre_data_tbIn['y'] = parseFloat(item.tbIn).toFixed(3)
                            pre_data_tbOut['x'] = item.date;
                            pre_data_tbOut['y'] = parseFloat(item.tbOut).toFixed(3)
                            result_TURBIDITY_input_pre.push(pre_data_tbIn);
                            result_TURBIDITY_output_pre.push(pre_data_tbOut);

                            pre_data_ecIn['x'] = item.date;
                            pre_data_ecIn['y'] = parseFloat(item.ecIn).toFixed(3)
                            pre_data_ecOut['x'] = item.date;
                            pre_data_ecOut['y'] = parseFloat(item.ecOut).toFixed(3)
                            result_EC_input_pre.push(pre_data_ecIn);
                            result_EC_output_pre.push(pre_data_ecOut);

                            pre_data_tdsIn['x'] = item.date;
                            pre_data_tdsIn['y'] = parseFloat(item.tdsIn).toFixed(3)
                            pre_data_tdsOut['x'] = item.date;
                            pre_data_tdsOut['y'] = parseFloat(item.tdsOut).toFixed(3)
                            result_TDS_input_pre.push(pre_data_tdsIn);
                            result_TDS_output_pre.push(pre_data_tdsOut);
                        })

                        
                        for (i=1; i<result_minutes.length ; i++){
                            if(result_minutes[i-1]>result_minutes[i]){
                                k.push(i)
                            }
                        }
                

                        supply_info_json.forEach((item) => {
                            result_datetime_su.push(item.occurrence_datetime);
                            const split_dt = result_datetime_su[result_datetime_su.length-1].split('T');
                            const split_hms = split_dt[1].split(':');
                            

                            result_FCL_supply.push(parseFloat(item.FCL).toFixed(3));
                            result_TURBIDITY_supply.push(parseFloat(item.TURBIDITY).toFixed(3));
                            result_pH_supply.push(parseFloat(item.pH).toFixed(3));
                            result_TDS_supply.push(parseFloat(item.TDS).toFixed(3));
                            result_EC_supply.push(parseFloat(item.EC).toFixed(3));
                            result_TEMP_supply.push(parseFloat(item.TEMP).toFixed(3));
                        })



                        count = result_datetime.length - result_FCL_supply.length
                        // console.log("count",count)
                        /*
                        for(l=0; l<count; l++){
                            result_FCL_supply.push(result_FCL_supply[result_FCL_supply.length-1]);
                            result_TURBIDITY_supply.push(result_TURBIDITY_supply[result_TURBIDITY_supply.length-1]);
                            result_pH_supply.push(result_pH_supply[result_pH_supply.length-1]);
                            result_TDS_supply.push(result_TDS_supply[result_TDS_supply.length-1]);
                            result_EC_supply.push(result_EC_supply[result_EC_supply.length-1]);
                            result_TEMP_supply.push(result_TEMP_supply[result_TEMP_supply.length-1]);
                        }
                        */

                        // console.log("fcl supply 후",result_FCL_supply)
                        // console.log("fcl input ",result_FCL_input)
                        // console.log(supply_info_json)
                        // alert(result_datetime);

                        for (i = 0; i < result_datetime.length; i++) 
                        {
                            result_datetime_label.push(moment(result_datetime[i]));
                        }


                        const split_dt = result_datetime[result_datetime.length-1].split('T');
                        const split_date = split_dt[0].split('-');
                        const split_hms = split_dt[1].split(':');
                        
                        datetime_tz = new Date(split_date[0], split_date[1] - 1, split_date[2], parseInt(split_hms[0]) + 9, split_hms[1], split_hms[2].replace("Z", ""))
                        // alert(result_datetime[result_datetime.length-1]);
                        // alert(datetime_tz);


                        // let time_meas = split_date[0] + "년 " + split_date[1] + "월 "+ split_date[2] + "일 " + split_hms[0] + "시 " + split_hms[1] + "분 " + parseInt(split_hms[2]).toString().padStart(2,'0') + "초";
                        let time_meas = datetime_tz.getFullYear() + "년 " + (datetime_tz.getMonth() + 1) + "월 "+ datetime_tz.getDate() + "일 " + datetime_tz.getHours() + "시 " + datetime_tz.getMinutes() + "분 " + datetime_tz.getSeconds() + "초";

                        $(".sensor_info_time .time").html(time_meas);

                        if(time_status === time_meas){
                            $(".sensor_info_time .status_img").css({ "background-image": "url(../static/img/update2.png" }) 
                        }
                        else{
                            $(".sensor_info_time .status_img").css({ "background-image": "url(../static/img/update1.png" }) 
                        }
                        time_status = time_meas

                        $(".sensor_info_temp .temp").html(room_temp[room_temp.length-1].toString() + "℃");
                        $(".sensor_info_temp .hum").html(room_hum[room_hum.length-1].toString() + "%");

                        ajaxChk = false;
                    } catch(e){
                        ajaxChk = false;
                    }
                },
                error: function (error) {
                    console.log(error);
                    ajaxChk = false;
                }
                
            }); 
        }
    };
    /*====================================================================================================*/
    function pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    };
    /*====================================================================================================*/
    function img(img_str, sensor_name) {
        var str = 'url(../static/img/'+ img_str + '.gif)';
        var sensor = ".sensor." + sensor_name + " .img";
        var $select_sensor= $(sensor);
        
        $select_sensor.css({ "background-image": str});
    };
    
    /*====================================================================================================*/
    function separator_color(status, sensor_name) {
        var separator = ".sensor." + sensor_name + " .separator";
        var separator_ver = ".sensor." + sensor_name + " .separator_ver";
        var separator_ver2 = ".sensor." + sensor_name + " .separator_ver2";
        var $select_sep1= $(separator);
        var $select_sep2= $(separator_ver);
        var $select_sep3= $(separator_ver2);
        
        if(status == "dang"){
            $select_sep1.css({"border-top": "1px solid rgb(255, 255, 255)"});
            $select_sep2.css({"border-left": "1px solid rgb(255, 255, 255)"});
            $select_sep3.css({"border-top": "1px solid rgb(255, 255, 255)"});
        }
        else{
            $select_sep1.css({"border-top": "1px solid rgb(200, 200, 200, 0.8)"});
            $select_sep2.css({"border-left": "1px solid rgb(200, 200, 200, 0.8)"});
            $select_sep3.css({"border-top": "1px solid rgb(200, 200, 200, 0.8)"});
        }
    };
    /*====================================================================================================*/

    function update_chart() {
        
        get_chart_data();

        chart_duration = select_chart_duration.options[select_chart_duration.selectedIndex].value;

        if (chart_duration < 72) {
            time_unit = 'minute'
        }
        else {
            time_unit = 'day'
        }

        chart_FCL.data.labels = result_datetime_label;
        chart_FCL.options.scales.xAxes[0].time.unit = time_unit;
        chart_FCL.data.datasets[0].data = result_FCL_supply;
        if(loc_type != 5){
            chart_FCL.data.datasets[1].data = result_FCL_input;        
            chart_FCL.data.datasets[3].data = result_FCL_input_pre;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_FCL.data.datasets[2].data = result_FCL_output;
            chart_FCL.data.datasets[4].data = result_FCL_output_pre;
        }
        

        chart_TURBIDITY.data.labels = result_datetime_label;
        chart_TURBIDITY.options.scales.xAxes[0].time.unit = time_unit;
        chart_TURBIDITY.data.datasets[0].data = result_TURBIDITY_supply;
        if(loc_type != 5){
            chart_TURBIDITY.data.datasets[1].data = result_TURBIDITY_input;
            chart_TURBIDITY.data.datasets[3].data = result_TURBIDITY_input_pre;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_TURBIDITY.data.datasets[2].data = result_TURBIDITY_output;
            chart_TURBIDITY.data.datasets[4].data = result_TURBIDITY_output_pre;
        }

        chart_pH.data.labels = result_datetime_label;
        chart_pH.options.scales.xAxes[0].time.unit = time_unit;
        chart_pH.data.datasets[0].data = result_pH_supply;
        if(loc_type != 5){
            chart_pH.data.datasets[1].data = result_pH_input;        
            chart_pH.data.datasets[3].data = result_pH_input_pre;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_pH.data.datasets[2].data = result_pH_output;
            chart_pH.data.datasets[4].data = result_pH_output_pre;
        }
        

        chart_TDS.data.labels = result_datetime_label;
        chart_TDS.options.scales.xAxes[0].time.unit = time_unit;
        chart_TDS.data.datasets[0].data = result_TDS_supply;
        if(loc_type != 5){
            chart_TDS.data.datasets[1].data = result_TDS_input;
            chart_TDS.data.datasets[3].data = result_TDS_input_pre;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_TDS.data.datasets[2].data = result_TDS_output;
            chart_TDS.data.datasets[4].data = result_TDS_output_pre;
        }
        

        chart_EC.data.labels = result_datetime_label;
        chart_EC.options.scales.xAxes[0].time.unit = time_unit;
        chart_EC.data.datasets[0].data = result_EC_supply;
        if(loc_type != 5){
            chart_EC.data.datasets[1].data = result_EC_input;
            chart_EC.data.datasets[3].data = result_EC_input_pre;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_EC.data.datasets[2].data = result_EC_output;
            chart_EC.data.datasets[4].data = result_EC_output_pre;
        }

        chart_TEMP.data.labels = result_datetime_label;
        chart_TEMP.options.scales.xAxes[0].time.unit = time_unit;
        chart_TEMP.data.datasets[0].data = result_TEMP_supply;
        if(loc_type != 5){
            chart_TEMP.data.datasets[1].data = result_TEMP_input;
        }
        if(loc_type == 0 || loc_type == 5){
            chart_TEMP.data.datasets[2].data = result_TEMP_output;
        }


        chart_FCL.update();
        chart_TURBIDITY.update();
        chart_pH.update();
        chart_TDS.update();
        chart_EC.update();
        chart_TEMP.update();

        if($('#forecastCheck').is(':checked') && result_FCL_output_pre.length > 0){
            $(".forecast_loading").css("display","none");
            $(".btn_forecast_label").css("display","block");     
        }

        if((temp_data_len != result_FCL_input.length) || (temp_data_len2 != result_FCL_supply.length)){
            $(".chart_loading").css("display","none");
            $(".chart_info_title").css("display","block");
            $(".chart_info .combobox").css("display","block");
        }

        temp_data_len = result_FCL_input.length;
        temp_data_len2 = result_FCL_supply.length;

        if(loc_type == 5){
            $(".FCL .value_in").html('-');
        }else{
            $(".FCL .value_in").html(parseFloat(result_FCL_input[result_FCL_input.length - 1]).toFixed(2).toString());
        }
        $(".FCL .value_out").html(parseFloat(result_FCL_output[result_FCL_output.length - 1]).toFixed(2).toString());

        if(loc_type == 5){
            $(".TURBIDITY .value_in").html('-');
        }else{
            $(".TURBIDITY .value_in").html(parseFloat(result_TURBIDITY_input[result_TURBIDITY_input.length - 1]).toFixed(3).toString());
        }
        $(".TURBIDITY .value_out").html(parseFloat(result_TURBIDITY_output[result_TURBIDITY_output.length - 1]).toFixed(3).toString());

        if(loc_type == 5){
            $(".pH .value_in").html('-');
        }else{
            $(".pH .value_in").html(parseFloat(result_pH_input[result_pH_input.length - 1]).toFixed(1).toString());
        }
        $(".pH .value_out").html(parseFloat(result_pH_output[result_pH_output.length - 1]).toFixed(1).toString());

        if(loc_type == 5){
            $(".TDS .value_in").html('-');
        }else{
            $(".TDS .value_in").html(parseFloat(result_TDS_input[result_TDS_input.length - 1]).toFixed(0).toString());
        }
        $(".TDS .value_out").html(parseFloat(result_TDS_output[result_TDS_output.length - 1]).toFixed(0).toString());

        if(loc_type == 5){
            $(".EC .value_in").html('-');
        }else{
            $(".EC .value_in").html(parseFloat(result_EC_input[result_EC_input.length - 1]).toFixed(0).toString());
        }
        $(".EC .value_out").html(parseFloat(result_EC_output[result_EC_output.length - 1]).toFixed(0).toString());

        if(loc_type == 5){
            $(".TEMP .value_in").html('-');
        }else{
            $(".TEMP .value_in").html(parseFloat(result_TEMP_input[result_TEMP_input.length - 1]).toFixed(1).toString());
        }
        $(".TEMP .value_out").html(parseFloat(result_TEMP_output[result_TEMP_output.length - 1]).toFixed(1).toString());

        let tmp = parseFloat(result_FCL_supply[result_FCL_supply.length-1]).toFixed(2).toString()
        if(tmp != "NaN")
        {
            $(".FCL .facility_value_dp").html(tmp);
        }
        else
        {
            $(".FCL .facility_value_dp").html("-");
        }

        tmp = parseFloat(result_TURBIDITY_supply[result_TURBIDITY_supply.length-1]).toFixed(2).toString()
        if(tmp != "NaN")
        {
            $(".TURBIDITY .facility_value_dp").html(tmp);
        }
        else
        {
            $(".TURBIDITY .facility_value_dp").html("-");
        }

        tmp = parseFloat(result_pH_supply[result_pH_supply.length-1]).toFixed(1).toString()
        if(tmp != "NaN")
        {
            $(".pH .facility_value_dp").html(tmp);
        }
        else
        {
            $(".pH .facility_value_dp").html("-");
        }

        tmp = parseFloat(result_TDS_supply[result_TDS_supply.length-1]).toFixed(0).toString()
        if(tmp != "NaN")
        {
            $(".TDS .facility_value_dp").html(tmp);
        }
        else
        {
            $(".TDS .facility_value_dp").html("-");
        } 

        tmp = parseFloat(result_EC_supply[result_EC_supply.length-1]).toFixed(0).toString()
        if(tmp != "NaN")
        {
            $(".EC .facility_value_dp").html(tmp);
        }
        else
        {
            $(".EC .facility_value_dp").html("-");
        }
        
        tmp = parseFloat(result_TEMP_supply[result_TEMP_supply.length-1]).toFixed(1).toString()
        if(tmp != "NaN")
        {
            $(".TEMP .facility_value_dp").html(tmp);
        }
        else
        {
            $(".TEMP .facility_value_dp").html("-");
        }



        let list_warning = [];
        let list_danger = [];
        let result = [];
        let dang_cnt = 0;
        let warn_cnt = 0;
        let img_message ='';
    
        result = judge_water_status(".FCL .result_in", result_FCL_input[result_FCL_input.length - 1], 
            0, 0,
            water_condition[0].fields.FCL_caution1_upper, water_condition[0].fields.FCL_caution1_lower,
            water_condition[0].fields.FCL_caution2_upper,water_condition[0].fields.FCL_caution2_lower, 
            water_condition[0].fields.FCL_serious_upper, water_condition[0].fields.FCL_serious_lower);
        if (result[0] > 0 && loc_type != 5) {
            list_warning.push("잔류 염소 (in)");
            warn_cnt++;
            img_message += '2';
        }
        else if (result[1] > 0 && loc_type != 5) {
            list_danger.push("잔류 염소 (in)");
            dang_cnt++;
            img_message += '3';
        }
        else
            img_message += '1';    
        result = judge_water_status(".FCL .result_out", result_FCL_output[result_FCL_output.length - 1], 
            0, 0,
            water_condition[0].fields.FCL_caution1_upper, water_condition[0].fields.FCL_caution1_lower,
            water_condition[0].fields.FCL_caution2_upper,water_condition[0].fields.FCL_caution2_lower, 
            water_condition[0].fields.FCL_serious_upper, water_condition[0].fields.FCL_serious_lower);
        if (result[0] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_warning.push("잔류 염소 (out)");
            warn_cnt++;
            img_message += '2';
        }
        else if (result[1] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_danger.push("잔류 염소 (out)");
            dang_cnt++;
            img_message += '3';
        }
        else
            img_message += '1'; 
        
        img(img_message,"FCL");
            
        if(warn_cnt > 0 && dang_cnt <= 0){
            $(".sensor.FCL").css({"background-color":"rgb(255, 232, 191)","animation":" warnblink 1s linear infinite" })
            $(".chart.FCL").css({"animation":" warnblink 1s linear infinite" });
            separator_color("warn", "FCL")
        }
        else if(dang_cnt>0){
            $(".sensor.FCL").css({"background-color":"rgb(255, 186, 161)","animation":" dangblink 1s linear infinite"})
            $(".chart.FCL").css({"animation":" dangblink 1s linear infinite" });
            separator_color("dang", "FCL")
            
        }
        else if(dang_cnt == 0 && warn_cnt == 0){
            $(".sensor.FCL").css({"background-color":"white","border":"2.5px solid rgb(121, 252, 147)","animation":"none"})
            $(".chart.FCL").css({"animation":" none" });
            separator_color("none", "FCL")     
        }
        
        dang_cnt =0;
        warn_cnt =0;
        img_message ='';

        result = judge_water_status(".TURBIDITY .result_in", result_TURBIDITY_input[result_TURBIDITY_input.length - 1],  
            0, 0,    
            water_condition[0].fields.TURBIDITY_caution1_upper, water_condition[0].fields.TURBIDITY_caution1_lower,
            -1, -1, 
            water_condition[0].fields.TURBIDITY_serious_upper, -1);
        if (result[0] > 0 && loc_type != 5) {
            list_warning.push("탁도 (in)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && loc_type != 5) {
            list_danger.push("탁도 (in)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        result = judge_water_status(".TURBIDITY .result_out", result_TURBIDITY_output[result_TURBIDITY_output.length - 1],
            0, 0,
            water_condition[0].fields.TURBIDITY_caution1_upper, water_condition[0].fields.TURBIDITY_caution1_lower,
            -1, -1, 
            water_condition[0].fields.TURBIDITY_serious_upper, -1);
        if (result[0] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_warning.push("탁도 (out)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_danger.push("탁도 (out)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';
       
        img(img_message,"TURBIDITY");
        
        if(warn_cnt > 0 && dang_cnt <= 0){
            $(".sensor.TURBIDITY").css({"background-color":"rgb(255, 232, 191)","animation":" warnblink 1s linear infinite" })
            $(".chart.TURBIDITY").css({"animation":" warnblink 1s linear infinite" });
            separator_color("warn", "TURBIDITY")
        }
        else if(dang_cnt>0){
            $(".sensor.TURBIDITY").css({"background-color":"rgb(255, 186, 161)","animation":" dangblink 1s linear infinite"})
            $(".chart.TURBIDITY").css({"animation":" dangblink 1s linear infinite" });
            separator_color("dang", "TURBIDITY")
        }
        else if(dang_cnt == 0 && warn_cnt == 0){
            $(".sensor.TURBIDITY").css({"background-color":"white","border":"2.5px solid rgb(121, 252, 147)","animation":"none"})
            $(".chart.TURBIDITY").css({"animation":" none" });
            separator_color("none", "TURBIDITY")
        }
        
        dang_cnt =0;
        warn_cnt =0;
        img_message ='';

        result = judge_water_status(".pH .result_in", result_pH_input[result_pH_input.length - 1],
            0, 0,    
            water_condition[0].fields.pH_caution1_upper, water_condition[0].fields.pH_caution1_lower,
            water_condition[0].fields.pH_caution2_upper,water_condition[0].fields.pH_caution2_lower, 
            water_condition[0].fields.pH_serious_upper, water_condition[0].fields.pH_serious_lower);

        if (result[0] > 0 && loc_type != 5) {
            list_warning.push("pH (in)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && loc_type != 5) {
            list_danger.push("pH (in)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        result = judge_water_status(".pH .result_out", result_pH_output[result_pH_output.length - 1],
            0, 0,
            water_condition[0].fields.pH_caution1_upper, water_condition[0].fields.pH_caution1_lower,
            water_condition[0].fields.pH_caution2_upper,water_condition[0].fields.pH_caution2_lower, 
            water_condition[0].fields.pH_serious_upper, water_condition[0].fields.pH_serious_lower);

        if (result[0] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_warning.push("pH (out)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_danger.push("pH (out)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';
        
        img(img_message,"pH");

        if(warn_cnt > 0 && dang_cnt <= 0){
            $(".sensor.pH").css({"background-color":"rgb(255, 232, 191)","animation":" warnblink 1s linear infinite" })
            $(".chart.pH").css({"animation":" warnblink 1s linear infinite" });
            separator_color("warn", "pH")
        }
        else if(dang_cnt>0){
            $(".sensor.pH").css({"background-color":"rgb(255, 186, 161)","animation":" dangblink 1s linear infinite"})
            $(".chart.pH").css({"animation":" dangblink 1s linear infinite" });
            separator_color("dang", "pH")
        }
        else if(dang_cnt == 0 && warn_cnt == 0){
            $(".sensor.pH").css({"background-color":"white","border":"2.5px solid rgb(121, 252, 147)","animation":"none"})
            $(".chart.pH").css({"animation":"none" });
            separator_color("none", "pH")
        }
        
        dang_cnt =0;
        warn_cnt =0;
        img_message ='';

        result = judge_water_status(".TDS .result_in", result_TDS_input[result_TDS_input.length - 1],
            0, 0,    
            water_condition[0].fields.TDS_caution1_upper, water_condition[0].fields.TDS_caution1_lower,
            water_condition[0].fields.TDS_caution2_upper, water_condition[0].fields.TDS_caution2_lower, 
            water_condition[0].fields.TDS_serious_upper, water_condition[0].fields.TDS_serious_lower);

        if (result[0] > 0 && loc_type != 5) {
            list_warning.push("TDS (in)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && loc_type != 5) {
            list_danger.push("TDS (in)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        result = judge_water_status(".TDS .result_out", result_TDS_output[result_TDS_output.length - 1],
            0, 0,    
            water_condition[0].fields.TDS_caution1_upper, water_condition[0].fields.TDS_caution1_lower,
            water_condition[0].fields.TDS_caution2_upper, water_condition[0].fields.TDS_caution2_lower, 
            water_condition[0].fields.TDS_serious_upper, water_condition[0].fields.TDS_serious_lower);

        if (result[0] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_warning.push("TDS (out)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_danger.push("TDS (out)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        img(img_message,"TDS");

        if(warn_cnt > 0 && dang_cnt <= 0){
            $(".sensor.TDS").css({"background-color":"rgb(255, 232, 191)","animation":" warnblink 1s linear infinite" })
            $(".chart.TDS").css({"animation":" warnblink 1s linear infinite" });
            separator_color("warn", "TDS")
        }
        else if(dang_cnt>0){
            $(".sensor.TDS").css({"background-color":"rgb(255, 186, 161)","animation":" dangblink 1s linear infinite"})
            $(".chart.TDS").css({"animation":" dangblink 1s linear infinite" });
            separator_color("dang", "TDS")
        }
        else if(dang_cnt == 0 && warn_cnt == 0){
            $(".sensor.TDS").css({"background-color":"white","border":"2.5px solid rgb(121, 252, 147)","animation":"none"})
            $(".chart.TDS").css({"animation":"none" });
            separator_color("none", "FCL")
        }
        
        dang_cnt =0;
        warn_cnt =0;
        img_message ='';

        result = judge_water_status(".EC .result_in", result_EC_input[result_EC_input.length - 1],
            0, 0,    
            water_condition[0].fields.EC_caution1_upper, water_condition[0].fields.EC_caution1_lower,
            water_condition[0].fields.EC_caution2_upper, water_condition[0].fields.EC_caution2_lower, 
            water_condition[0].fields.EC_serious_upper, water_condition[0].fields.EC_serious_lower);

        if (result[0] > 0 && loc_type != 5) {
            list_warning.push("EC (in)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && loc_type != 5) {
            list_danger.push("EC (in)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        result = judge_water_status(".EC .result_out", result_EC_output[result_EC_output.length - 1],
            0, 0,    
            water_condition[0].fields.EC_caution1_upper, water_condition[0].fields.EC_caution1_lower,
            water_condition[0].fields.EC_caution2_upper, water_condition[0].fields.EC_caution2_lower, 
            water_condition[0].fields.EC_serious_upper, water_condition[0].fields.EC_serious_lower);

        if (result[0] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_warning.push("EC (out)");
            warn_cnt++;
            img_message +='2';
        }
        else if (result[1] > 0 && ( loc_type == 0 || loc_type == 5)) {
            list_danger.push("EC (out)");
            dang_cnt++;
            img_message +='3';
        }
        else
            img_message +='1';

        img(img_message,"EC");
    
        if(warn_cnt > 0 && dang_cnt <= 0){
            $(".sensor.EC").css({"background-color":"rgb(255, 232, 191)","animation":" warnblink 1s linear infinite" })
            $(".chart.EC").css({"animation":" warnblink 1s linear infinite" });
            separator_color("warn", "EC")
        }
        else if(dang_cnt>0){
            $(".sensor.EC").css({"background-color":"rgb(255, 186, 161)","animation":" dangblink 1s linear infinite"})
            $(".chart.EC").css({"animation":" dangblink 1s linear infinite" });
            separator_color("dang", "EC")
        }
        else if(dang_cnt == 0 && warn_cnt == 0){
            $(".sensor.EC").css({"background-color":"white","border":"2.5px solid rgb(121, 252, 147)","animation":"none"})
            $(".chart.EC").css({"animation":"none" });
            separator_color("none", "EC")
        }
        
        dang_cnt =0;
        warn_cnt =0;
        img_message ='';

        // result = judge_water_status(".TEMP .result_in", result_TEMP_input[result_TEMP_input.length - 1],             
        //     0, 0,
        //     -10000, -10000, -10000, -10000, -10000, -10000);
        // result = judge_water_status(".TEMP .result_out", result_TEMP_output[result_TEMP_output.length - 1], 
        //     0, 0,
        //     -10000, -10000, -10000, -10000, -10000, -10000);
        // if (result[0] > 0) {
        //     list_warning.push("수온");
        // }
        // else if (result[1] > 0) {
        //     list_danger.push("수온");
        // }

        let str_danger = '';
        let str_warning = '';

        for (i = 0; i < list_danger.length; i++) {
            str_danger += list_danger[i];
            if (i != list_danger.length - 1)
                str_danger += ", ";
        }
        for (i = 0; i < list_warning.length; i++) {
            str_warning += list_warning[i];
            if (i != list_warning.length - 1)
                str_warning += ", ";
        }
        
        

        if (list_danger.length > 0) {
            $(".water_condition .value").html("심각");
            $(".water_condition .value").css({"color":"rgb(200, 0, 0)","animation":" blinker 1s linear infinite"});
        }
        else {
            if (list_warning.length > 0) {
                $(".water_condition .value").html("주의");
                $(".water_condition .value").css({"color" : "rgb(255, 153, 0)","animation" : " none "});
            }
            else {
                $(".water_condition .value").html("적합");
                $(".water_condition .value").css({"color" : "rgb(0, 176, 80)","animation" : " none "});
            }
        }
        if(str_danger ==''){
            str_danger='-';
        }
        if(str_warning ==''){
            str_warning='-';
        }
        $(".list_index .danger .value").html(str_danger);
        $(".list_index .warning .value").html(str_warning);        

    }
    /*====================================================================================================*/
    /*====================================================================================================*/
    function draw_chart() {
        var label1;
        var label2;
        var label3;
        var label4;
        if(loc_type == 2 || loc_type == 3 || loc_type == 4 ){
            label1 = "급식실";
            label2 = "음수대";
            label3 = "급식실 PRE";
            label4 = "음수대 PRE";
        }else{
            label1 = "IN";
            label2 = "OUT";
            label3 = "IN PRE";
            label4 = "OUT PRE";
        }
        chart_FCL = new Chart(ctx_FCL,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_FCL_supply,
                            borderDash: [5,5],
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,

                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_FCL_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_FCL_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                        {  
                            label: label3,
                            borderColor: "rgb(255,124,16)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fillStyle: "rgba(255,0,0,1)",
                            fill: false,
                        },
                        {
                            label: label4,
                            borderColor: "rgb(241,51,51)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fill: false,
                            
                        },
                        
                    ]

                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                              displayFormats:{
                                'minute': 'HH:mm'
                              }  
                            },

                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                            labels: {
                                boxWidth: 30,      
                                filter: function (item, chart) {
                                    if(loc_type == 2){
                                        return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                    }else if(loc_type == 3){
                                        return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                    }else if(loc_type == 4){
                                        return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                    }else {
                                        return !["IN PRE", "OUT PRE"].includes(item.text);
                                    }                                    
                                },
                            },
                            tooltip: {
                                filter: function (item, chart) {
                                    return !(item.datasetIndex == 2 || item.datasetIndex == 3);
                                }
                            },
                     },
                }
            });
        chart_TURBIDITY = new Chart(ctx_TURBIDITY,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_TURBIDITY_supply,
                            borderDash: [5,5],
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,

                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_TURBIDITY_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_TURBIDITY_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                        {  
                            label: label3,
                            borderColor: "rgb(255,124,16)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fillStyle: "rgba(255,0,0,1)",
                            fill: false,
                        },
                        {
                            label: label4,
                            borderColor: "rgb(241,51,51)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fill: false,
                            
                        },
                      
                    ]

                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                                displayFormats:{
                                  'minute': 'HH:mm'
                                }  
                              },

                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                        labels: {
                            boxWidth: 30,      
                            filter: function (item, chart) {
                                if(loc_type == 2){
                                    return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                }else if(loc_type == 3){
                                    return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                }else if(loc_type == 4){
                                    return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                }else {
                                    return !["IN PRE", "OUT PRE"].includes(item.text);
                                }
                            },
                        },
                        tooltip: {
                            filter: function (item, chart) {
                                return !(item.datasetIndex == 2 || item.datasetIndex == 3);
                            }
                        },
                    },

                }
            });
        chart_pH = new Chart(ctx_pH,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_pH_supply,
                            borderDash: [5,5],
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,

                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_pH_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_pH_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                        {  
                            label: label3,
                            borderColor: "rgb(255,124,16)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fillStyle: "rgba(255,0,0,1)",
                            fill: false,
                        },
                        {
                            label: label4,
                            borderColor: "rgb(241,51,51)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fill: false,
                            
                        },
                        
                    ]
                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                                displayFormats:{
                                  'minute': 'HH:mm'
                                }  
                              },                      

                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                        labels: {
                            boxWidth: 30,      
                            filter: function (item, chart) {
                                if(loc_type == 2){
                                    return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                }else if(loc_type == 3){
                                    return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                }else if(loc_type == 4){
                                    return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                }else {
                                    return !["IN PRE", "OUT PRE"].includes(item.text);
                                }
                            },
                        },
                        tooltip: {
                            filter: function (item, chart) {
                                return !(item.datasetIndex == 2 || item.datasetIndex == 3);
                            }
                        },
                    },
                }
            });

        chart_TDS = new Chart(ctx_TDS,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_TDS_supply,
                            borderDash: [5,5],
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_TDS_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_TDS_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                        {  
                            label: label3,
                            borderColor: "rgb(255,124,16)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fillStyle: "rgba(255,0,0,1)",
                            fill: false,
                        },
                        {
                            label: label4,
                            borderColor: "rgb(241,51,51)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fill: false,
                            
                        },
                    ]

                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                                displayFormats:{
                                  'minute': 'HH:mm'
                                }  
                              },

                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                        labels: {
                            boxWidth: 30,      
                            filter: function (item, chart) {
                                if(loc_type == 2){
                                    return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                }else if(loc_type == 3){
                                    return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                }else if(loc_type == 4){
                                    return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                }else {
                                    return !["IN PRE", "OUT PRE"].includes(item.text);
                                }
                            },
                        },
                        tooltip: {
                            filter: function (item, chart) {
                                return !(item.datasetIndex == 2 || item.datasetIndex == 3);
                            }
                        },
                    },
                }
            });

        chart_EC = new Chart(ctx_EC,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_EC_supply,
                            borderDash: [5,5],
                            pointStyle: "rect", 
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,

                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_EC_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_EC_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                        {  
                            label: label3,
                            borderColor: "rgb(255,124,16)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fillStyle: "rgba(255,0,0,1)",
                            fill: false,
                        },
                        {
                            label: label4,
                            borderColor: "rgb(241,51,51)",
                            pointRadius: 0,
                            borderDash: [10, 5],
                            order: 1,
                            fill: false,
                            
                        },
                        
                    ]

                },
                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 10,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 10,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                                displayFormats:{
                                  'minute': 'HH:mm'
                                }  
                              },
                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                        labels: {
                            boxWidth: 30,      
                            filter: function (item, chart) {
                                if(loc_type == 2){
                                    return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                }else if(loc_type == 3){
                                    return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                }else if(loc_type == 4){
                                    return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                }else {
                                    return !["IN PRE", "OUT PRE"].includes(item.text);
                                }
                            },
                        },
                        tooltip: {
                            filter: function (item, chart) {
                                return !(item.datasetIndex == 2 || item.datasetIndex == 3);
                            }
                        },
                    },
                }
            });

        chart_TEMP = new Chart(ctx_TEMP,
            {
                type: 'line',
                data: {
                    labels: result_datetime_label,
                    datasets: [
                        {
                            label: '배수지',
                            data: result_TEMP_supply,
                            borderDash: [5,5],
                            borderColor: 'rgba(144, 245, 233, 0.8)',
                            backgroundColor: 'rgba(144, 245, 233, 1)',
                            fill: false,
                            tension: 0.3,

                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(144, 245, 233)',
                            pointBackgroundColor: 'rgba(144, 245, 233)',
                        },
                        {  
                            label: label1,
                            data: result_TEMP_input,   
                            borderColor: 'rgba(26, 168, 232, 0.8)',
                            backgroundColor: 'rgba(26, 168, 232, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(26, 168, 232)',
                            pointBackgroundColor: 'rgba(26, 168, 232)',
                        },
                        {
                            label: label2,
                            data: result_TEMP_output,
                            borderColor: 'rgba(150, 150, 150, 0.8)',
                            backgroundColor: 'rgba(150, 150, 150, 1)',
                            fill: false,
                            tension: 0.3,
                            pointRadius: 0,
                            pointHoverBorderColor: 'rgba(150, 150, 150)',
                            pointBackgroundColor: 'rgba(150, 150, 150)',
                            
                        },
                    
                    ]

                },

                options: {
                    responsive: true,
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    hover: {
                        mode: "index",
                        intersect: false,
                        animationDuration: 100,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false,
                            },
                        }],
                        xAxes: [{
                            type: 'time',
                            time:{
                                displayFormats:{
                                  'minute': 'HH:mm'
                                }  
                              },

                            ticks: {
                                beginAtZero: false,
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0,
                            },
                        }],
                    },
                    legend: {
                        labels: {
                            boxWidth: 30,      
                            filter: function (item, chart) {
                                if(loc_type == 2){
                                    return !["급식실 PRE", "음수대 PRE", "음수대"].includes(item.text);
                                }else if(loc_type == 3){
                                    return !["급식실 PRE", "음수대 PRE", "급식실"].includes(item.text);
                                }else if(loc_type == 4){
                                    return !["급식실 PRE", "음수대 PRE"].includes(item.text);
                                }else {
                                    return !["IN PRE", "OUT PRE"].includes(item.text);
                                }
                            },
                        }
                    },
                }
            });
    };

    const forecastCheck = document.getElementById("forecastCheck");
    forecastCheck.addEventListener('change', function () {
        const duration = document.getElementById("select_chart_duration");
        if (this.checked) {
            this.setAttribute("original", duration.selectedIndex);
            duration.selectedIndex = 3;
            duration.disabled = true;
            clearInterval(intervalChk)
            if(predictModel == 0){
                intervalChk = setInterval(update_chart, 5 * 1000);
            }else if(predictModel == 1){
                update_chart();
                intervalChk = setInterval(update_chart, 20 * 1000);
            }

            $(".forecast_loading").css("display","block");
            $(".btn_forecast_label").css("display","none");
            
                
        } else {
            duration.selectedIndex = this.getAttribute("original");
            this.setAttribute("original", null);
            duration.disabled = false;
            clearInterval(intervalChk)
            intervalChk = setInterval(update_chart, 3 * 1000);
            $(".forecast_loading").css("display","none");
            $(".btn_forecast_label").css("display","block");
        }
    })
    
    

    function get_predict_model() {
        $.ajax({
            type: "POST",
            url: '../get_predict_model/',
            data:
            {
                'csrfmiddlewaretoken': csrfmiddlewaretoken,
                'maintenace_checed': maintenace_checed,
            },
            dataType: "json",
            success: function (data) {
                predictModel = data.predict_model
                if($("input:checkbox[id='forecastCheck']").is(":checked")){
                    clearInterval(intervalChk)
                    if(predictModel == 0){
                        intervalChk = setInterval(update_chart, 5 * 1000);
                    }else if(predictModel == 1){
                        intervalChk = setInterval(update_chart, 20 * 1000);
                    }
                }               

                if(data.system_maintenance == 1){
                    alert("Smart PureWater System 점검 중입니다.\n점검시간: "+data.system_maintenance_Start+" ~ "+data.system_maintenance_end+"\n불편을 드려 죄송합니다.\n담당자 연락처 : "+data.system_maintenance_phone);
                    maintenace_checed = true;
                }else if(data.system_maintenance ==2){
                    alert("수질측정기 점검 중입니다.\n점검시간: "+data.system_maintenance_Start+" ~ "+data.system_maintenance_end+"\n불편을 드려 죄송합니다.\n담당자 연락처 : "+data.system_maintenance_phone);
                    maintenace_checed = true;
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    $(".loc_info").change(function(){
        document.cookie = "loc_id="+$(this).val();
        location.reload();
    });

});





