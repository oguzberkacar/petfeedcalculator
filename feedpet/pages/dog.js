jQuery(document).ready(function () {
  jQuery(".dog-calc .pcc-calc-wrap").prepend("<h3>Dog Calorie Calculator</h3>");
  const lifeStage = [
    { value: "puppy", title: "Puppy" },
    { value: "adult", title: "Adult" },
  ];
  const gender = [
    { value: "male", title: "Male" },
    { value: "female", title: "Female" },
  ];
  const neutering = [
    { value: "neutered", title: "Neutered / Spayed" },
    { value: "intact", title: "Intact" },
  ];
  const femaleGestation = [{ value: "gestation", title: "Pregnant" }];
  const femaleLactation = [{ value: "lactation", title: "Lactating" }];
  const puppy = [
    { value: "lt4", title: "< 4 months" },
    { value: "gt4", title: "> 4 months" },
  ];
  const formContainers = jQuery(".dog-calc form");
  formContainers.each((ind, formContainerElement) => {
    let formContainer = jQuery(formContainerElement);
    pccAddDoubleRadio(formContainer, "life-stage", lifeStage);
    pccAddDoubleRadio(formContainer, "gender", gender, "flex-end");
    pccAddLineBraker(formContainer);
    pccAddInput(formContainer, "weight", "Weight", "number", "pet-lb", true);
    pccAddDropDown(formContainer, "neutering", neutering);
    pccAddLineBraker(formContainer);
    pccAddRadio(formContainer, "female", femaleGestation);
    pccAddRadio(formContainer, "female", femaleLactation);
    pccAddDoubleRadio(formContainer, "puppy", puppy, "pcc-w-auto");
    pccAddRange(formContainer, "activity", 1, 5, 1, "Level of Activity", [
      "sedentary",
      "light activity",
      "moderate activity",
      "active",
      "very active",
    ]);
    pccAddSubmitBtn(formContainer, "Calculate", "button pcc-yellow-button");
    formContainer
      .find('[name="life-stage"], [name="gender"], [name="neutering"]')
      .change(function () {
        toggleGestation(formContainer);
      });
    formContainer.find('[name="life-stage"]').change(function () {
      togglePuppy(formContainer);
    });
    formContainer
      .find(
        '[name="life-stage"], [name="gender"], [name="neutering"], [name="female"]'
      )
      .change(function () {
        toggleActivity(formContainer);
      });
    formContainer.find('[name="female"]').parents(".pet-radio").hide();
    pccDisableRadio(formContainer.find('[name="female"]'));
    pccDoubleCheckboxFix(formContainer);
    pccCheckboxFix(formContainer);
  });
});
function toggleActivity(formContainer) {
  let female = formContainer.find('[name="female"]:checked').val();
  if ("undefined" !== typeof female) {
    formContainer.find('[type="range"]').attr("disabled", "disabled");
    formContainer.find(".pet-range").addClass("disabled");
  } else {
    formContainer.find('[type="range"]').removeAttr("disabled");
    formContainer.find(".pet-range").removeClass("disabled");
  }
}
function toggleGestation(formContainer) {
  let lifeStage = formContainer.find('[name="life-stage"]:checked').val();
  if ("undefined" === typeof lifeStage) {
    lifeStage = "adult";
  }
  let gender = formContainer.find('[name="gender"]:checked').val();
  if ("undefined" === typeof gender) {
    gender = "female";
  }
  let neutering = formContainer.find('[name="neutering"]').val();
  if (!neutering) {
    neutering = "intact";
  }
  if ("adult" === lifeStage && "female" === gender && "intact" === neutering) {
    pccEnableRadio(formContainer.find('[name="female"]'));
    formContainer.find('[name="female"]').parents(".pet-radio").show(200);
  } else {
    pccDisableRadio(formContainer.find('[name="female"]'));
    formContainer.find('[name="female"]').parents(".pet-radio").hide(200);
  }
}
function togglePuppy(formContainer) {
  let lifeStage = formContainer.find('[name="life-stage"]:checked').val();
  if ("undefined" === typeof lifeStage) {
    lifeStage = "adult";
  }
  if ("puppy" === lifeStage) {
    formContainer.find('[name="puppy"]').parents(".pet-radio").show(200);
  } else {
    formContainer.find('[name="puppy"]').parents(".pet-radio").hide(200);
  }
}
async function pccCalculatorDog(event) {
  event.preventDefault();
  let form = jQuery(event.target);
  let btn = form.find('button[type="submit"]');
  btn.addClass("loading");
  await pccSleep(1000);
  let calc = form.parents(".pet-calc");
  calc.find(".cal-output").empty();
  calc.find(".pcc-product").empty();
  calc.find(".pcc-product-quantity").empty();
  let weightLB = form.find('[name="weight"]').val();
  let weightKG = weightLB / 2.2;
  let RER = Math.pow(weightKG, 0.75) * 70;
  let DER = { min: RER, max: RER };
  let lifeStage = form.find('[name="life-stage"]:checked').val();
  let puppy = form.find('[name="puppy"]:checked').val();
  let io = form.find('[name="io"]:checked').val();
  let gender = form.find('[name="gender"]:checked').val();
  let neutering = form.find('[name="neutering"]').val();
  let female = form.find('[name="female"]:checked').val();
  let activity = form.find('[name="activity"]').val();
  activity = activity * 1;
  let kcal = 0;
  let img = "";
  let title = "";
  let link = "";
  let btnTitle = "";
  if (calc.attr("product_img")) {
    img = calc.attr("product_img");
    title = calc.attr("product_title");
    link = calc.attr("product_link");
    btnTitle = calc.attr("button_title");
    kcal = calc.attr("kcal_per_item");
    if (link) {
      if (btnTitle) {
        link =
          '<a href="' +
          link +
          '" target="_blank" class="button pcc-yellow-button">' +
          btnTitle +
          "</a>";
      } else {
        link =
          '<a href="' + link + '" target="_blank" class="pcc-abs-link"></a>';
      }
    }
  }
  if ("puppy" === lifeStage) {
    if ("lt4" === puppy) {
      DER.min = DER.min * 3;
      DER.max = DER.max * 3;
    } else if ("gt4" === puppy) {
      DER.min = DER.min * 2;
      DER.max = DER.max * 2;
    }
    calc.find(".cal-output").append("<h3>Recommended Daily Calories</h3>");
    calc.find(".cal-output").append('<div class="pcc-container"></div>');
    calc
      .find(".cal-output .pcc-container")
      .append(
        "<div><span>" +
          pcc2numsToTxt(DER.min, DER.max) +
          " kcal / day</span></div>"
      );
    if (img) {
      calc.find(".pcc-product").append("<h3>Our Recommended Product</h3>");
      if (title.length) {
        calc.find(".pcc-product").append("<h4>" + title + "</h4>");
      }
      calc
        .find(".pcc-product")
        .append(
          '<div class="pcc-product-img"><img src="' +
            img +
            '">' +
            link +
            "</div>"
        );
    }
    if (kcal) {
      calc
        .find(".pcc-product-quantity")
        .append("<h3>Recommended Daily Serving Size</h3>");
      calc
        .find(".pcc-product-quantity")
        .append('<div class="pcc-container"></div>');
      calc
        .find(".pcc-product-quantity .pcc-container")
        .append(
          "<div><span>" +
            pcc2numsToTxt(DER.min / kcal, DER.max / kcal, true) +
            " cups / day</span></div>"
        );
    }
  } else {
    let coeffMin = DER.min;
    let coeffMax = DER.min;
    if ("gestation" === female) {
      coeffMin = 2;
      coeffMax = 3;
    }
    if ("lactation" === female) {
      coeffMin = 3;
      coeffMax = 6;
    }
    if ("intact" === neutering && !female) {
      coeffMin = 1.6;
      coeffMax = 1.8;
    }
    if ("neutered" === neutering) {
      coeffMin = 1.4;
      coeffMax = 1.6;
    }
    if (activity >= 4) {
      switch (activity) {
        case 4:
          if (coeffMin < 2) {
            coeffMin = 2;
          }
          if (coeffMax < 2) {
            coeffMax = 2;
          }
          break;
        case 5:
          if (coeffMin < 3.5) {
            coeffMin = 3.5;
          }
          if (coeffMax < 3.5) {
            coeffMax = 3.5;
          }
          break;
      }
    }
    DER.min = DER.min * coeffMin;
    DER.max = DER.max * coeffMax;
    calc.find(".cal-output").append("<h3>Recommended Daily Calories</h3>");
    calc.find(".cal-output").append('<div class="pcc-container"></div>');
    if ("gestation" === female || "lactation" === female) {
      calc
        .find(".cal-output .pcc-container")
        .append(
          "<div><span>" +
            pcc2numsToTxt(DER.min * 1, DER.max * 1) +
            " kcal / day</span></div>"
        );
    } else {
      calc
        .find(".cal-output .pcc-container")
        .append(
          '<div><span class="sub-title">To lose:</span><span>' +
            pcc2numsToTxt(DER.min * 0.8, DER.max * 0.8) +
            " kcal / day</span></div>"
        );
      calc
        .find(".cal-output .pcc-container")
        .append(
          '<div><span class="sub-title">To maintain:</span><span>' +
            pcc2numsToTxt(DER.min * 1, DER.max * 1) +
            " kcal / day</span></div>"
        );
      calc
        .find(".cal-output .pcc-container")
        .append(
          '<div><span class="sub-title">To gain:</span><span>' +
            pcc2numsToTxt(DER.min * 1.2, DER.max * 1.2) +
            " kcal / day</span></div>"
        );
    }
    if (img) {
      calc.find(".pcc-product").append("<h3>Our Recommended Product</h3>");
      if (title.length) {
        calc.find(".pcc-product").append("<h4>" + title + "</h4>");
      }
      calc
        .find(".pcc-product")
        .append(
          '<div class="pcc-product-img"><img src="' +
            img +
            '">' +
            link +
            "</div>"
        );
    }
    if (kcal) {
      calc
        .find(".pcc-product-quantity")
        .append("<h3>Recommended Daily Serving Size</h3>");
      calc
        .find(".pcc-product-quantity")
        .append('<div class="pcc-container"></div>');
      if ("gestation" === female || "lactation" === female) {
        calc
          .find(".pcc-product-quantity .pcc-container")
          .append(
            "<div><span>" +
              pcc2numsToTxt((DER.min * 1) / kcal, (DER.max * 1) / kcal, true) +
              " cups / day</span></div>"
          );
      } else {
        calc
          .find(".pcc-product-quantity .pcc-container")
          .append(
            '<div><span class="sub-title">To lose:</span><span>' +
              pcc2numsToTxt(
                (DER.min * 0.8) / kcal,
                (DER.max * 0.8) / kcal,
                true
              ) +
              " cups / day</span></div>"
          );
        calc
          .find(".pcc-product-quantity .pcc-container")
          .append(
            '<div><span class="sub-title">To maintain:</span><span>' +
              pcc2numsToTxt((DER.min * 1) / kcal, (DER.max * 1) / kcal, true) +
              " cups / day</span></div>"
          );
        calc
          .find(".pcc-product-quantity .pcc-container")
          .append(
            '<div><span class="sub-title">To gain:</span><span>' +
              pcc2numsToTxt(
                (DER.min * 1.2) / kcal,
                (DER.max * 1.2) / kcal,
                true
              ) +
              " cups / day</span></div>"
          );
      }
    }
  }
  btn.removeClass("loading");
}
