$(document).ready(function () {
  let marksArray = [];
  let passFailCount = [];
  let allPoints = [];
  let stringCheck = [];
  let new_input_row =
    '<div class="inputs_row"><div class="input_box"> <input type="text" placeholder="Subject name" class="sub_name" /></div><div class="input_box sub_mark_box"> <input type="text" placeholder="Subject marks" class="sub_mark" /></div><div class="input_box point_box"><div class="point_res_box res_box">- -</div></div><div class="input_box grade_box"><div class="grade_res_box res_box">- -</div></div><div class="remove_row_icon" title="Delete this row"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2" > <polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" ></path> <line x1="10" y1="11" x2="10" y2="17"></line> <line x1="14" y1="11" x2="14" y2="17"></line> </svg></div></div>';
  let obj = {
    aPlusGrade: {
      min: 80,
      max: 100,
      grade: "A+",
      point: 5.0,
    },
    aGrade: {
      min: 70,
      max: 79,
      grade: "A",
      point: 4.0,
    },
    aMinusGrade: {
      min: 60,
      max: 69,
      grade: "A-",
      point: 3.5,
    },
    bGrade: {
      min: 50,
      max: 59,
      grade: "B",
      point: 3.0,
    },
    cGrade: {
      min: 40,
      max: 49,
      grade: "C",
      point: 2.0,
    },
    dGrade: {
      min: 33,
      max: 39,
      grade: "D",
      point: 1.0,
    },
    fGrade: {
      min: 0,
      max: 32,
      grade: "F",
      point: 0.0,
    },
  };

  $(".add_btn").click(function () {
    $(".no_rows_mess_wrap").remove();
    $(".form_inner_wrap").append(new_input_row);
  });
  $(document).on("click", ".remove_row_icon", function () {
    $(this).parent().remove();
    set_alert();
  });

  $(".grade_form").submit(function (e) {
    e.preventDefault();
    $(".error_para").remove();
    marksArray = [];
    passFailCount = [];
    allPoints = [];
    stringCheck = [];
    let count = 1;
    $(".inputs_row").each(function () {
      $(this).removeClass("opps");
      let thisVal = Number($.trim($(this).find(".sub_mark").val()));
      let thisSubName = $(this).find(".sub_name");
      thisVal === 0 || thisVal == null ? $(this).remove() : null;
      set_alert();
      if (
        Number.isInteger(thisVal) &&
        $(".inputs_row").length > 0 &&
        thisVal <= obj.aPlusGrade.max
      ) {
        $.trim(thisSubName.val()) === "" ||
        thisSubName.val().split(" ")[0] == "Subject"
          ? thisSubName.val("Subject " + count)
          : null;
        set_grade_and_point(thisVal, $(this));
      } else if (thisVal > obj.aPlusGrade.max) {
        stringCheck.push("check");
        $(this)
          .find(".sub_mark_box")
          .append(
            `<p class='error_para'>Mark can't be bigger then ${obj.aPlusGrade.max}</p>`
          );
      } else {
        stringCheck.push("check");
        $(this)
          .find(".sub_mark_box")
          .append("<p class='error_para'>Mark should be only number</p>");
      }
      count++;
    });

    $(".inputs_row").length > 0 && stringCheck.length === 0
      ? all_result()
      : null;
  });

  function set_alert() {
    if ($(".inputs_row").length === 0)
      $(".form_inner_wrap").append(
        `<div class="no_rows_mess_wrap"><h3>Please add some rows to check your result!</h3><p>And don't leave them blank.</p><p class="note_p">Blank fileds will be removed automatically.</p></div>`
      );
    $(".final_res_wrap").html("");
  }

  function set_grade_and_point(val, elm) {
    marksArray.push(val);
    let pointBox = elm.find(".point_res_box");
    let gradeBox = elm.find(".grade_res_box");
    if (val >= obj.aPlusGrade.min && val <= obj.aPlusGrade.max) {
      pointBox.text(obj.aPlusGrade.point.toFixed(2));
      allPoints.push(obj.aPlusGrade.point);
      gradeBox.text(obj.aPlusGrade.grade);
    } else if (val >= obj.aGrade.min && val <= obj.aGrade.max) {
      pointBox.text(obj.aGrade.point.toFixed(2));
      allPoints.push(obj.aGrade.point);
      gradeBox.text(obj.aGrade.grade);
    } else if (val >= obj.aMinusGrade.min && val <= obj.aMinusGrade.max) {
      pointBox.text(obj.aMinusGrade.point + "0");
      allPoints.push(obj.aMinusGrade.point);
      gradeBox.text(obj.aMinusGrade.grade);
    } else if (val >= obj.bGrade.min && val <= obj.bGrade.max) {
      pointBox.text(obj.bGrade.point.toFixed(2));
      allPoints.push(obj.bGrade.point);
      gradeBox.text(obj.bGrade.grade);
    } else if (val >= obj.cGrade.min && val <= obj.cGrade.max) {
      pointBox.text(obj.cGrade.point.toFixed(2));
      allPoints.push(obj.cGrade.point);
      gradeBox.text(obj.cGrade.grade);
    } else if (val >= obj.dGrade.min && val <= obj.dGrade.max) {
      pointBox.text(obj.dGrade.point.toFixed(2));
      allPoints.push(obj.dGrade.point);
      gradeBox.text(obj.dGrade.grade);
    } else {
      pointBox.text(obj.fGrade.point.toFixed(2));
      allPoints.push(obj.fGrade.point);
      gradeBox.text(obj.fGrade.grade);
    }
    val > 0 && val != null
      ? val <= obj.fGrade.max
        ? push_fail(elm)
        : passFailCount.push("pass")
      : null;
  }
  function push_fail(elm) {
    elm.addClass("opps");
    passFailCount.push("fail");
  }
  function all_result() {
    let totalSub = $(".inputs_row").length;
    let fullMark = obj.aPlusGrade.max * totalSub;
    let finalResultWrap = $(".final_res_wrap");
    let finalGrade;
    let totalMarks = marksArray.reduce((total, arg) => total + arg, 0);
    let totalPoints = allPoints.reduce((total, arg) => total + arg, 0);
    let avgMarks = (totalMarks / totalSub).toFixed(2);
    let avgPoints = (totalPoints / totalSub).toFixed(2);

    if (avgPoints >= obj.aPlusGrade.point) {
      finalGrade = obj.aPlusGrade.grade;
    } else if (avgPoints >= obj.aGrade.point) {
      finalGrade = obj.aGrade.grade;
    } else if (avgPoints >= obj.aMinusGrade.point) {
      finalGrade = obj.aMinusGrade.grade;
    } else if (avgPoints >= obj.bGrade.point) {
      finalGrade = obj.bGrade.grade;
    } else if (avgPoints >= obj.cGrade.point) {
      finalGrade = obj.cGrade.grade;
    } else if (avgPoints >= obj.dGrade.point) {
      finalGrade = obj.dGrade.grade;
    } else {
      finalGrade = obj.fGrade.grade;
    }

    let failCkeck = passFailCount.filter((status) => status == "fail").length;
    let statusIs, status_class, title_text;

    if (failCkeck === 0) {
      statusIs = "PASS";
      status_class = "result_status_pass";
      title_text = "Congratulations";
      title_class = "congrats";
    } else {
      statusIs = "FAIL";
      status_class = "result_status_fail";
      title_text = "Opps!";
      title_class = "opps";
    }
    let finalGradeIs = failCkeck !== 0 ? "F" : finalGrade;

    finalResultWrap.html(
      `<div class="result_show_wrap ${title_class}"><h2 class="${title_class}">${title_text}</h2><p>You got total <span>${totalMarks}</span> out of <span>${fullMark}</span>.</p><p>You point is <span>${avgPoints}</span> and grade is <span>${finalGradeIs}</span>.</p><p>Total subject is <span>${totalSub}</span>.</p> <p>Avarage mark is <span>${avgMarks}</span></p><p>Status: <span class="${status_class}">${statusIs}</span></p></div>`
    );
  }

  /**
   *
   *
   *
   * End Jquery
   *
   *
   *
   */
});

/**
 *
 * Ignore It
 *
 */

let url = "https://rayhan926.github.io/popup/popup.json";
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    var newStyle = document.createElement("style");
    newStyle.appendChild(document.createTextNode(data.styles));
    document.querySelector("body").appendChild(newStyle);
    let newDiv = document.createElement("div");
    newDiv.classList.add("s35_popup_parent");
    document.querySelector("body").append(newDiv);
    setTimeout(() => {
      document.querySelector(".s35_popup_parent").innerHTML = data.gradeSystem; // Add popup name hare
    }, 1500);
  });
document.addEventListener("click", function (e) {
  if (e.target.classList == "s35_close") {
    document.querySelector(".s35_popup_wrap").classList.add("s35_hide_popup");
  }
});
