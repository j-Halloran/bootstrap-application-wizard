$(document).ready(function() {
  $.fn.wizard.logging = true;
  var wizard = $('#satellite-wizard').wizard({
    keyboard : false,
    contentHeight : 700,
    contentWidth : 700,
    backdrop: 'static'
  });
  wizard.show();

  $(".chzn-select").chosen();

  wizard.on('closed', function() {
    wizard.reset();
  });

  wizard.on('incrementCard',function(){
    console.log("Incrementing");
  })

  wizard.on("reset", function() {
    wizard.modal.find(':input').val('').removeAttr('disabled');
    wizard.modal.find('.form-group').removeClass('has-error').removeClass('has-succes');
  });

  wizard.on("submit", function(wizard) {
    var submit = {
      "hostname": $("#new-server-fqdn").val()
    };

    this.log('seralize()');
    this.log(this.serialize());
    this.log('serializeArray()');
    this.log(this.serializeArray());

    setTimeout(function() {
      wizard.trigger("success");
      wizard.hideButtons();
      wizard._submitting = false;
      wizard.showSubmitCard("success");
      wizard.updateProgressBar(0);
    }, 2000);
  });

  wizard.el.find(".wizard-success .im-done").click(function() {
    wizard.hide();
    setTimeout(function() {
      wizard.reset();
    }, 250);

  });

  wizard.el.find(".wizard-success .create-another-server").click(function() {
    wizard.reset();
  });

  $(".wizard-group-list").click(function() {
    alert("Disabled for demo.");
  });

  $('#open-wizard').click(function(e) {
    e.preventDefault();
    wizard.show();
  });
});

function validateServerLabel(el) {
  var name = el.val();
  var retValue = {};

  if (name == "") {
    retValue.status = false;
    retValue.msg = "Please enter an assignment name.";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateAssignmentType(el){
  var retValue = {};

  if(el.val()!=='N' || el.is(':hidden')){
    retValue.status = true;
  }
  else{
    retValue.status = false;
    retValue.msg = "Select an Assignment Type."
  }

  return retValue;
}

//Listener for is teacher graded only
$('#teacherGradeOnly').change(function(){
  teacherGradeOnlyToggle();
});

//teacher grade only toggle logic
function teacherGradeOnlyToggle(){
  if($('#teacherGradeOnly').val() === 'Y'){
    $('#backEvalSelDiv').hide();
    $('#backEvalSel').val("N");
    $('#reviewDeadlineDiv').hide();
    $('#backEvalDeadlineDiv').hide();
    $('div.wizard-nav-container > ul > li:nth-child(4)').hide(); //hide reviewing link
    $('div.wizard-nav-container > ul > li:nth-child(5)').hide(); //hide backeval link
    $('div.wizard-nav-container > ul > li:nth-child(6)').hide(); //hide grading link
    $('div.wizard-nav-container > ul > li:nth-child(7)').hide(); //hide late period link
    $("#reviewHide").prop("disabled", true); //disable for review card
    $("#backEvalPrompt").prop("disabled", true); //disable for back eval card
    $("#curveMean").prop("disabled", true); //disable for grading card
    $("#lateDocPenalty").prop("disabled", true); //disable for late card
  }
  else{
    $('#backEvalSelDiv').show();
    $('#backEvalSel').val("Y");
    $('#reviewDeadlineDiv').show();
    $('#backEvalDeadlineDiv').show();
    $('div.wizard-nav-container > ul > li:nth-child(4)').show(); //show reviewing link
    $('div.wizard-nav-container > ul > li:nth-child(5)').show(); //show backeval link
    $('div.wizard-nav-container > ul > li:nth-child(6)').show(); //show grading link
    $('div.wizard-nav-container > ul > li:nth-child(7)').show(); //show late period link
    $("#reviewHide").prop("disabled", false); //enable for review card
    $("#backEvalPrompt").prop("disabled", false); //enable for back eval card
    $("#curveMean").prop("disabled", false); //enable for grading card
    $("#lateDocPenalty").prop("disabled", false); //enable for late card
  }
}

//Listener for assignment type
$('#assignTypeSel').change(function(){
  if($('#assignTypeSel').val()==='T'){
    $('#submissionDeadlineDiv').hide();
    $('#teacherGradeOnlyDiv').hide();
    $('#subTypeSelDiv').hide();
    $('#teacherGradeOnly').val("N");
    teacherGradeOnlyToggle();
  }
  else{
    $('#submissionDeadlineDiv').show();
    $('#teacherGradeOnlyDiv').show();
    $('#subTypeSelDiv').show();
  }
});

//listener for submission type
$('#subTypeSel').change(function(){
  if($('#subTypeSel').val()==='F'){
    $('#convertDocsDiv').show();
  }
  else{
    $('#convertDocsDiv').hide();
  }
});

//listener for is backEvaled
$('#backEvalSel').change(function(){
  if($('#backEvalSel').val() === 'Y'){
    $('#backEvalDeadlineDiv').show();
    $('div.wizard-nav-container > ul > li:nth-child(5)').show();
    $( "#backEvalPrompt" ).prop( "disabled", false );
  }
  else{
    $('#backEvalDeadlineDiv').hide();
    $('div.wizard-nav-container > ul > li:nth-child(5)').hide();
    $("#backEvalPrompt").prop( "disabled", true );
    console.log("asdf");
  }
});

//listener for reviewing style
$('#reviewingStyle').change(function(){
  if($('#reviewingStyle').val()==='S'){
    $('#lateSubDocWindow').hide();
    $('#lateSubDocPen').hide();
  }
  else{
    $('#lateSubDocWindow').show();
    $('#lateSubDocPen').show();
  }
});
