$(document).ready(function() {
  $.fn.wizard.logging = true;
  var wizard = $('#satellite-wizard').wizard({
    keyboard : false,
    contentHeight : 700,
    contentWidth : 800,
    backdrop: 'static'
  });
  wizard.show();

  $(".chzn-select").chosen();

  $('#fqdn').on('input', function() {
    if ($(this).val().length != 0) {
      $('#ip').val('').attr('disabled', 'disabled');
      $('#fqdn, #ip').parents('.form-group').removeClass('has-error has-success');
    } else {
      $('#ip').val('').removeAttr('disabled');
    }
  });

  var pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
  x = 46;

  wizard.on('closed', function() {
    wizard.reset();
  });

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

  if(el.val()!=='N'){
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
  if($('#teacherGradeOnly').val() === 'Y'){
    $('#backEvalSelDiv').hide();
    $('#backEvalSel').val("N");
    $('#reviewDeadlineDiv').hide();
    $('#backEvalDeadlineDiv').hide();
    $('div.wizard-nav-container > ul > li:nth-child(4)').hide();
    $('div.wizard-nav-container > ul > li:nth-child(5)').hide();
    $('div.wizard-nav-container > ul > li:nth-child(6)').hide();
    $('div.wizard-nav-container > ul > li:nth-child(7)').hide();
  }
  else{
    $('#backEvalSelDiv').show();
    $('#backEvalSel').val("Y");
    $('#reviewDeadlineDiv').show();
    $('#backEvalDeadlineDiv').show();
    $('div.wizard-nav-container > ul > li:nth-child(4)').show();
    $('div.wizard-nav-container > ul > li:nth-child(5)').show();
    $('div.wizard-nav-container > ul > li:nth-child(6)').show();
    $('div.wizard-nav-container > ul > li:nth-child(7)').show();
  }
});

//Listener for assignment type
$('#assignTypeSel').change(function(){
  if($('#assignTypeSel').val()==='T'){
    $('#submissionDeadlineDiv').hide();
    $('#teacherGradeOnlyDiv').hide();
    $('#subTypeSelDiv').hide();
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
  }
  else{
    $('#backEvalDeadlineDiv').hide();
    $('div.wizard-nav-container > ul > li:nth-child(5)').hide();
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
