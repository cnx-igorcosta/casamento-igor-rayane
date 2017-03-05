//classes de slide em slide.css
var slides = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6'];
var containers = ['#banner', '#page-wrapper'];

$(document).ready(function(){
  if($('#titulo').css('opacity') == 0) {
    setTimeout(verificaTitulo,500);
  }else{
    setTimeout(primeiraTroca,3500);
  }

});

function verificaTitulo(){
  if($('#titulo').css('opacity') == 1) {
    setTimeout(primeiraTroca,3500);
  }else{
    setTimeout(verificaTitulo,500);
  }
}

function primeiraTroca(){
  $('#banner').addClass('slide');
  $('#banner').addClass('slide2');
  //$('#banner').addClass('consistent');
  setTimeout(function(){
    $('#banner').addClass('consistent');
    setTimeout(proximaTroca,5000);
  },1000);
  $('#nextSlide').val(2);
  $('#nextContainer').val(1);
  //containerSlide.val('banner');
  //nextContainer.val('page-wrapper');
}

function proximaTroca(){
  //recupera o id do próximo slide do array de slides
  var slideTroca = parseInt($('#nextSlide').val());
  //recupera o id do próximo container do array de containers
  var containerTroca = parseInt($('#nextContainer').val());
  //remove todas as classes do próximo slide, para evitar conflito
  for(var i = 0; i < slides.length; i++){
    $(containers[containerTroca]).removeClass(slides[i]);
  }
  //faz a troca do slide
  $(containers[containerTroca]).addClass(slides[slideTroca]);
  $('#banner').toggleClass('consistent');
  //verifica quais são os próximos container e slide
  var nextSlide = slides.length == (slideTroca + 1) ? 0 : (slideTroca + 1);
  var nextContainer = containers.length == (containerTroca + 1) ? 0 : (containerTroca + 1);
  $('#nextSlide').val(nextSlide);
  $('#nextContainer').val(nextContainer);
  //chama novamente a cada 8s
  setTimeout(proximaTroca,5000);
}

/*function proximaTroca(){
  $('#page-wrapper').removeClass('slide1');
  var atualContainer = $('#'+containerSlide.val());
  var proximoContainer = $('#'+nextContainer.val());
  $(slides).each(function(index, data){
      if((atualContainer).hasClass(data)){
        var proximoSlide = (slides.length == (index + 1) ? slides[0] : slides[index + 1]);
        proximoContainer.removeClass(data).addClass(proximoSlide);
        $('#banner').toggleClass('consistent');
        //troca quais são os próximos containers para a próxima troca de slides
        var nextContainerValue = containerSlide.val();
        var containerValue = nextContainer.val();
        containerSlide.val(nextContainerValue);
        nextContainer.val(containerValue);

        /*setTimeout(function(){
          proximoContainer.addClass(proximoSlide);
        },4000);
        //fecha o each
        return false;
    }
  });
  setTimeout(proximaTroca,9000);
}*/
