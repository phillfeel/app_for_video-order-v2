
document.addEventListener('DOMContentLoaded', function () {

  // --- Переменные для задания параметров страницы --- //

  //Переменная для максимальной длины текста (5 * validationLevel )
  const validatonLevel = 13;

  //Доступные форматы видео(значения в будущем классы)  
  let formats = {
    f16x9: "rectangle16x9",
    f1x1: "square",
    f9x16: "rectangle9x16"
  }

  //Функция изменения значения Основного Counter
  function changeValCountMain(item, max, min, step) {
    const plus = item.querySelector(".plus"),
      minus = item.querySelector(".minus"),
      count = item.querySelector(".count");
    count.setAttribute('disabled', true);
    plus.addEventListener("click", function () {
      if (count.value == step) { //только если MIN = 5 , а STEP = 10
        
        document.querySelector('.main-counter .minus').classList.remove('disabl');
      }
      if (count.value < max) {
        document.querySelector('.main-counter .minus').classList.remove('disabled');
        count.value = +count.value + step;
        let amountSlide = document.querySelectorAll('.video-slide').length;
        if (count.value / amountSlide >= step) {
          document.querySelector('.add-item-block.add-slide button').disabled = false;
          document.querySelector('.main-counter').classList.remove('notice');
        }
      }
      if (count.value == max) {
        plus.classList.add('disabled');
      }
    });

    minus.addEventListener("click", function () {
      let value = +count.value;
      if (value == max) {
        plus.classList.remove('disabled');
      }
      if (value / +document.querySelectorAll('.video-slide').length == step) {
        min = value;
      } else {
        min = min - step;
      }
      if (value > min) {
        count.value = value - step;
        value = count.value;
        let amountSlide = document.querySelectorAll('.video-slide').length;
        if (value / amountSlide == step) {
          document.querySelector('.add-item-block.add-slide button').disabled = true;
          minus.classList.add('disabled');
        }
      } else {
      };
      if (count.value == step) { //только если MIN = 5 , а STEP = 10
        
        document.querySelector('.main-counter .minus').classList.remove('disabled');
        document.querySelector('.main-counter .minus').classList.add('disabl');
      }

    })
  };

  //Функция изменения значения counter Слайдов
  function changeValCountSlides(item, max, min, step) {
    const plus = item.querySelector(".plus"),
      minus = item.querySelector(".minus"),
      count = item.querySelector(".count");
    count.setAttribute('disabled', true);
    plus.addEventListener("click", function () {
      if (count.value == min) {
        minus.classList.remove('disabled');
      }
      if (count.value < max) {
        count.value = +count.value + step;
      }
      if (count.value == max) {
        plus.classList.add('disabled');
      }
    });
    minus.addEventListener("click", function () {
      if (count.value == max) {
        plus.classList.remove('disabled');
      }
      if (count.value > min) {
        count.value = +count.value - step;
      }
      if (count.value == min) {
        minus.classList.add('disabled');
      }
    })
  };

  //запускаем counter общей длины слайда
  changeValCountMain(document.querySelector('.counter.main-counter'), 40, 5, 5);

  //Функция Touchstart and Touchend для counter для сенсорных
  function counterTouch(selector, element = "") {
    if (element != "") {
      selector = element;
    } else {
      selector = document.querySelector(`.${selector}`)
    }
    // MINUS TOUCHSTART
    selector.querySelector('span.minus').addEventListener("touchstart", function () {
      selector.querySelector('span.minus').classList.add('orange');
    });
    selector.querySelector('span.minus').addEventListener("touchend", function () {
      selector.querySelector('span.minus').classList.remove('orange');
    });
    // PLUS TOUCHSTART
    selector.querySelector('span.plus').addEventListener("touchstart", function () {
      selector.querySelector('span.plus').classList.add('orange');
    });
    selector.querySelector('span.plus').addEventListener("touchend", function () {
      selector.querySelector('span.plus').classList.remove('orange');
    });
  };
  counterTouch("main-settings");

  //Функция названия поля загрузки файла
  function uploadFile(target) { //заносим id Input
    target.addEventListener('change', () => {
      
      let amount = target.files.length;
      if (target.id == "extra-files" && amount != 0) {
        let comment = "";
        
        switch (true) {
          case ((amount >= 2 && amount <= 4) || (amount % 10 >= 2 && amount % 10 <= 4)):
            comment = "изображения";
            break;
          case ((amount == 1) || (amount % 10 == 1)):
            comment = "изображение";
            break;
          case (amount >= 5 && amount <= 20):
            comment = "изображений";
            break;
        };
        
        target.previousElementSibling.lastElementChild.textContent = target.files.length + " " + comment;
      } else {
        target.previousElementSibling.lastElementChild.textContent = target.files[0].name;
      }
    });
  };

  //Иницианализируем изменение названия длины
  uploadFile(document.getElementById('extra-files'));

  //Переменные для создания Prewiew
  const formatVideoSelect = document.querySelector(".format-video__change_input"),
      formatPreview = document.createElement("div");
  let formatVideoZone = document.querySelector(".format-video__preview"),
      pickedVideoFormat = formatVideoSelect.value;


  //Функция создания дефолтных prewiew
  function createPreview(zone, item, picked) {
    
    let nameFormatArr = picked.split(":"),
      nameFormat = `f${nameFormatArr[0]}x${nameFormatArr[1]}`;
    item.classList = formats[nameFormat];
    zone.appendChild(item);
  }

  //Функция создания prewiewCustom для format
  function createPreviewCustom() {
    const inputCustomSize = document.querySelector(".format-video__input-size"),
      inputHorizont = inputCustomSize.firstElementChild,
      inputVertical = inputCustomSize.lastElementChild;

    const customSizeElem = document.createElement('div');
    customSizeElem.classList.add("format-video__preview");
    customSizeElem.innerHTML = '<div class="custom-size-preview"></div>';
    inputCustomSize.after(customSizeElem);

    const customSizePreview = document.querySelector(".custom-size-preview");
    let horizontPx, verticalPx, proportionPx, resizeVerticalPx, resizeHorizontPx;

    customSizePreview.style.display = 'none';

    inputHorizont.addEventListener("input", () => {
      horizontPx = inputHorizont.value;
      if (!inputVertical.value == "") {
        if (inputHorizont.value == "" || inputVertical.value == "") {
          customSizePreview.style.display = 'none';
        } else {
          customSizePreview.style.display = 'block';
        }
        proportionPx = 30 / verticalPx,
          resizeVerticalPx = proportionPx * verticalPx,
          resizeHorizontPx = proportionPx * horizontPx;
        customSizePreview.style.width = `${resizeHorizontPx}px`;
        customSizePreview.style.height = `${resizeVerticalPx}px`;
        customSizePreview.style.border = '1px solid #febf00'
      }
    });
    inputVertical.addEventListener("input", () => {
      verticalPx = inputVertical.value;
      if (!inputHorizont.value == "") {
        if (inputHorizont.value == "" || inputVertical.value == "") {
          customSizePreview.style.display = 'none';
        } else {
          customSizePreview.style.display = 'block';
        }
        proportionPx = 30 / verticalPx;
        resizeVerticalPx = proportionPx * verticalPx;
        resizeHorizontPx = proportionPx * horizontPx;
        customSizePreview.style.width = `${resizeHorizontPx}px`;
        customSizePreview.style.height = `${resizeVerticalPx}px`;
        customSizePreview.style.border = '1px solid #febf00'
      }
    });
  }

  //Функция удаления Prewiew
  function deletePreviewCustom() {
    const formatVideoZone2 = document.querySelector('.format-video__preview');
    formatVideoZone2.remove();
  }

  // --- Создаем prewiew формата --- //
  if (formatVideoZone) {
    createPreview(formatVideoZone, formatPreview, pickedVideoFormat);
  }
  formatVideoSelect.addEventListener('change', () => {
    if (formatVideoSelect.value === "Ввести") {
      formatVideoZone.remove();
      const inputSize = document.createElement('div');
      inputSize.classList.add('format-video__input-size');
      inputSize.innerHTML = `
        <input name="custom-format-width" class="form-control form-control-sm" type="number" placeholder="пиксели">
        <p>X</p>
        <input name="custom-format-height" class="form-control form-control-sm" type="number" placeholder="пиксели">`
      formatVideoSelect.parentNode.after(inputSize);
      createPreviewCustom();
    } else {
      if (document.querySelector('.format-video__input-size')) {
        document.querySelector('.format-video__input-size').remove();
        deletePreviewCustom();
        formatVideoZone = document.createElement("div");
        formatVideoZone.classList.add("format-video__preview");
        formatVideoSelect.parentNode.after(formatVideoZone);
      }
      pickedVideoFormat = formatVideoSelect.value;
      createPreview(formatVideoZone, formatPreview, pickedVideoFormat);
    }
  })

  //Функция disable Enable для чекбоксов и полей
  function turnForm(elem) {
    
    const moreColorsCheckbox = elem.querySelector(".optional-checkbox"),
      moreColorsInpt = elem.querySelector(".optional-txt");

    moreColorsCheckbox.addEventListener('click', function () {
      if (moreColorsCheckbox.checked) {
        moreColorsInpt.removeAttribute('disabled', false);
      } else {
        moreColorsInpt.setAttribute('disabled', true);
      }
    });
  }

  // add video in slide
  function initSlideVideo (slide){
    var allVideos = slide.querySelectorAll(`.slick-slider .slick-list .sl_slice video`);
    allVideos.forEach(video => video.pause() );
    slide.querySelector(".slick-slider .slick-list .slick-current video").play();
  
    var mutationCount = 0;
   
    var observer = new MutationObserver(function (mutations) {
      if (mutationCount === 0){
        let currentVideo = slide.querySelector(".slick-slider .slick-list .slick-current video");
        if (currentVideo === null || currentVideo === undefined ){
          return
        }
        allVideos.forEach(video =>{ 
          video.currentTime = 0;
          video.pause() 
        });
        currentVideo.currentTime = 0;
        currentVideo.play();
        mutationCount++;
      }else{
       mutationCount = 0;
      }
    }); 
   
    var config = {
      attributes: true,
      childList: false,
      characterData: false
    };
    var forObserve = slide.querySelector(".slick-slider .slick-list .slick-track");
    observer.observe(forObserve, config);
  }  


  //Функция создания основы слайда
  function setSlideHtmlWithSelector(number, selector) {
    let logo = "",
      stimulPhrs = "",
      productPrice = "",
      serviceDescription = "",
      stock = "",
      contacts = "";
    switch (selector) {
      case "logo":
        logo = "selected";
        break;
      case "stimul":
        stimulPhrs = "selected";
        break;
      case "product":
        productPrice = "selected";
        break;
      case "service":
        serviceDescription = "selected";
        break;
      case "stock":
        stock = "selected";
        break;
      case "contact":
        contacts = "selected";
        break;
    };
    let forConstruct = `<div class="wrapper"><div class="title-line"><div class="left-title"><h5 class="video-slide__number">${number}</h5><select name="slide-${number}" class="video-slide__change form-control form-control-sm"><option value="stimul" ${stimulPhrs}>Побуждающая фраза</option><option value="logo" ${logo}>Интро (вступление)</option><option value="product" ${productPrice}>Товар-Цена</option><option value="service" ${serviceDescription}>Услуга-Описание</option><option value="stock" ${stock}>Акция</option><option value="contact" ${contacts}>Контакты</option></select></div><div class="right-title"><h6 class="duration-title">Длительность</h6><div class="counter qty slide-counter"><span class="minus"><i class="fas fa-minus-circle"></i></span><input type="number" class="count" name="qty" value="5" disabled="true"><span class="plus"><i class="fas fa-plus-circle"></i></span></div></div></div></div>`                    
    return forConstruct;
  }

  //Функция создания второй части слайда
  function createSecondPartHtml(nameForInitSlider) {
    let textZoneHtml_1 = `<div class="text-zone">
    <p class="title">Вы можете начать видеоролик с вопроса или фразы призывающей к покупке</p>   
    <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
     </div>`;
    let textZoneHtml_2 = `<div class="text-zone">
     <div class="solo-check form-check">
       <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
       <label class="form-check-label" for="defaultCheck1">
       <input disabled name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу">
       </label>
     </div>
   </div>`;

    let textForContact = `<div class="option-contact solo-check form-check">
   <input class="form-check-input optional-checkbox" type="checkbox" value="" id="defaultCheck1">
   <label class="form-check-label" for="defaultCheck1">
     <input name="optional-text" class="optional-txt form-control form-control-sm" type="text" placeholder="Добавить слоган или фразу" disabled="true">
   </label>
   </div>`

    let textStockHtml = `<div class="text-zone">
        <textarea name="stock-text" class="form-control text-field stock-text" id="textarea3" placeholder="Текст акции" rows="1"></textarea>
   </div>`;

    let nameAttach,
        attachHtml,
        carouselHtml,
        gifName;

    function getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4) {
      let carousel = `<h6 class="duration-title">Настроить анимацию</h6>
      <div class="chooseAnimation-zone">
        <div class="${nameForInitSlider}">
          <div class="sl_slice">
            <video class="video1" muted autoplay loop crossorigin="anonymous"/>
            <source src="video/${gifName}-1.webm" type='video/webm; codecs="vp8, vorbis"'>
            <source src="video/${gifName}-1.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Видео не поддерживается вашим браузером</video>
            <p class="sl_text">${nameAnim_1}</p>
         </div>
          <div class="sl_slice">
            <video class="video1" muted autoplay loop crossorigin="anonymous"/>
            <source src="video/${gifName}-2.webm" type='video/webm; codecs="vp8, vorbis"'>
            <source src="video/${gifName}-2.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Видео не поддерживается вашим браузером</video>
            <p class="sl_text">${nameAnim_2}</p>
         </div>
         <div class="sl_slice">
            <video class="video1" muted autoplay loop crossorigin="anonymous"/>
            <source src="video/${gifName}-3.webm" type='video/webm; codecs="vp8, vorbis"'>
            <source src="video/${gifName}-3.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Видео не поддерживается вашим браузером</video>
            <p class="sl_text">${nameAnim_3}</p>
         </div>
         <div class="sl_slice">
            <video class="video1" muted autoplay loop crossorigin="anonymous"/>
            <source src="video/${gifName}-4.webm" type='video/webm; codecs="vp8, vorbis"'>
            <source src="video/${gifName}-4.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Видео не поддерживается вашим браузером</video>
            <p class="sl_text">${nameAnim_4}</p>
         </div>
         <div class="sl_slice">
            <video class="video1" muted autoplay loop crossorigin="anonymous"/>
            <source src="video/${gifName}-5.webm" type='video/webm; codecs="vp8, vorbis"'>
            <source src="video/${gifName}-5.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            Видео не поддерживается вашим браузером</video>
            <p class="sl_text">${nameAnim_5}</p>
         </div>
        </div>
      </div>`;
    return carousel;
  };

    function getAttachHtml(name) {
      let attach = `<div class="attach-block for-logo">
    <label class="my-file-input" for="exampleFormControlFile1"><p><i name="image-outline" class="far fa-image"></i>${name}</p></label>
    <input type="file" name="example" accept="image/*" class="form-control-file" id="exampleFormControlFile1">
    </div>`
      return attach;
    };

    let productZoneHtml = `<div class="product-block mini-block" id="product-1">
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="product-1_name" type="text" class="form-control  form-control-sm" placeholder="Название товара">
        </div>
        <div class="col">
          <input  name="product-1_price" type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="product-1_descript" type="text" class="form-control  description form-control-sm" placeholder="Описание товара">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="product-slider-1_img-1">
            <p>
            <i name="image-outline" class="far fa-image"></i>
            Изображение</p>
            </label>
            <input type="file" name="product-slider-1_img-1" accept="image/*" class="form-control-file" id="product-slider-1_img-1">
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
        <div class="delete-item">
          <div class="close">
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="add-item-block inside">
      <div class="add-item">
        <i class="fas fa-plus-circle"></i>
        <p>Добавить товар</p>
      </div>
    </div>`;

    let serviceZoneHtml = `<div class="product-block service mini-block" id="service-1">
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="service-1_name" type="text" class="form-control  form-control-sm" placeholder="Название услуги">
        </div>
        <div class="col">
          <input name="service-1_price" type="text" class="form-control  form-control-sm" placeholder="Цена">
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
          <input name="service-1_descript" type="text" class="form-control description form-control-sm" placeholder="Описание услуги">
        </div>
        <div class="col">
          <div class="attach-block for-product">
            <label class="my-file-input" for="service-slider-1_img-1">
              <p>
              <i name="image-outline" class="far fa-image"></i>
              Изображение</p>
            </label>
            <input type="file" name="service-slider-1_img-1" accept="image/*" class="form-control-file" id="service-slider-1_img-1">
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
        <div class="delete-item">
          <div class="close">
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="add-item-block inside">
      <div class="add-item">
      <i class="fas fa-plus-circle"></i>
        <p>Добавить услугу</p>
      </div>
    </div>`;

    let removeSlideHtml = `<div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><i class="far fa-trash-alt"></i><p>Удалить слайд</p></button></div>`;

    let insideHtml,
        nameAnim_1 = "Динамичный",
        nameAnim_2 = "Нежный",
        nameAnim_3 = "Технологичный",
        nameAnim_4 = "Брутальный",
        nameAnim_5 = "Строгий";
      
    switch (true) {
      case /logo-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить логотип';
        gifName='logo';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${textZoneHtml_2}${carouselHtml}${removeSlideHtml}`;
        break;
      case /stimul-part_slider/i.test(nameForInitSlider):
        gifName='stimul';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${textZoneHtml_1}${carouselHtml}${removeSlideHtml}`;
        break;
      case /product-part_slider/i.test(nameForInitSlider):
        gifName='product';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${productZoneHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /service-part_slider/i.test(nameForInitSlider):
        gifName='service';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        insideHtml = `${serviceZoneHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /stock-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить изображение';
        gifName='stock';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textStockHtml}${carouselHtml}${removeSlideHtml}`;
        break;
      case /contact-part_slider/i.test(nameForInitSlider):
        nameAttach = 'Прикрепить фото фасада';
        gifName='contact';
        carouselHtml = getCarouselHtml(gifName, nameAnim_1, nameAnim_2, nameAnim_3, nameAnim_4);
        attachHtml = getAttachHtml(nameAttach);
        insideHtml = `${attachHtml}${textForContact}${carouselHtml}${removeSlideHtml}`;
        break;
    }
    return insideHtml;
  };

  //Функция создания верстки первого слайда  
  function setStimulHtmlWithSlider(name) {
    let insideHtmlStimulPrase = `
    <div class="text-zone">
    <p class="title">Вы можете начать видеоролик с вопроса или фразы призывающей к покупке</p>   
    <input class="text-field form-control" type="text" name="stimul-text" placeholder="Введите текст">
     </div>
     <h6 class="duration-title">Выберите анимацию</h6>
     <div class="chooseAnimation-zone">
       <div class="${name}">
         <div class="sl_slice">
         <video class="video1" muted autoplay loop crossorigin="anonymous"/>
         <source src="video/stimul-1.webm" type='video/webm; codecs="vp8, vorbis"'>
         <source src="video/stimul-1.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
         Видео не поддерживается вашим браузером</video>
         <p class="sl_text">Динамичный</p>
         </div>
         <div class="sl_slice">
         <video class="video1" muted autoplay loop crossorigin="anonymous"/>
         <source src="video/stimul-2.webm" type='video/webm; codecs="vp8, vorbis"'>
         <source src="video/stimul-2.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
         Видео не поддерживается вашим браузером</video>
         <p class="sl_text">Нежный</p>
         </div>
         <div class="sl_slice">
         <video class="video1" muted autoplay loop crossorigin="anonymous"/>
         <source src="video/stimul-3.webm" type='video/webm; codecs="vp8, vorbis"'>
         <source src="video/stimul-3.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
         Видео не поддерживается вашим браузером</video>
         <p class="sl_text">Технологичный</p>
         </div>
         <div class="sl_slice">
         <video class="video1" muted autoplay loop crossorigin="anonymous"/>
         <source src="video/stimul-4.webm" type='video/webm; codecs="vp8, vorbis"'>
         <source src="video/stimul-4.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
         Видео не поддерживается вашим браузером</video>
         <p class="sl_text">Брутальный</p>
         </div> 
         <div class="sl_slice">
         <video class="video1" muted autoplay loop crossorigin="anonymous"/>
         <source src="video/stimul-5.webm" type='video/webm; codecs="vp8, vorbis"'>
         <source src="video/stimul-5.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
         Видео не поддерживается вашим браузером</video>
         <p class="sl_text">Строгий</p>
         </div> 
        </div>
        </div>
     <div class="btn-zone"><button type="button" class="btn-remove-slide btn btn-outline-danger btn-sm"><i class="far fa-trash-alt"></i><p>Удалить слайд</p></button></div>`
     return insideHtmlStimulPrase;
  };

//canvas 
/* <div class="sl_slice"><canvas id="c1" width="244" height="137"></canvas>
<p class="sl_text">Текст</p>
</div> 
 */


  let nameSlider;

  //Функция добавления второй части слайда
  function createSecondPart(wrapp, part2, classPart, funcHtmlSlider) {
    part2 = document.createElement('div');
    part2.classList.add(classPart);
    part2.innerHTML = funcHtmlSlider;
    wrapp.appendChild(part2);
  };

  //Функция для добавления товара или услуги на страницу
  function addProduct(insideSlideWrapp, nameSlider) {
    insideSlideWrapp.querySelector('.add-item').addEventListener('click', (elem) => {
      let target = elem.target;
      let allProducts = insideSlideWrapp.querySelectorAll('.product-block');
      let nextProduct = allProducts[allProducts.length - 1].cloneNode(true);

      let productNumb = +nextProduct.id.split("-")[1];
      let nextProductId = `${nextProduct.id.split("-")[0]}-${productNumb + 1}`;
      nextProduct.id = nextProductId;

      uploadFile(nextProduct.querySelector('input[type="file"]'));
      nameSlider = nameSlider.replace(/part_/g, "");
      let nextProductId2 = nextProductId.replace(/\w*-/gi, "");

      nextProduct.querySelectorAll('input[type="text"]')[0].setAttribute('name', nextProductId + "_name");
      nextProduct.querySelectorAll('input[type="text"]')[1].setAttribute('name', nextProductId + "_price");
      nextProduct.querySelectorAll('input[type="text"]')[2].setAttribute('name', nextProductId + "_descript");

      let idAttach = nameSlider + "_img-" + nextProductId2;
      nextProduct.querySelector('input[type="file"]').id = idAttach;
      nextProduct.querySelector('input[type="file"]').setAttribute('name', idAttach)
      nextProduct.querySelector('.my-file-input').setAttribute('for', idAttach);

      target.parentElement.parentElement.before(nextProduct);
      nextProduct.querySelectorAll('input').forEach((inpt) => {
        inpt.value = '';
        if (inpt.type == "file") {
          inpt.previousElementSibling.lastElementChild.innerHTML = '<i name="image-outline" class="far fa-image"></i>Изображение';
        }
      });
      nextProduct.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length > 1) {
          nextProduct.remove();
        }
      });
    });
  };

  //Функция для удаления слайда
  function deleteSlide(btn) {
    if (document.querySelectorAll('.video-slide').length == 1) {
      document.querySelector('.btn-remove-slide').disabled = true;
    } else {
      document.querySelector('.btn-remove-slide').disabled = false;
    }
    btn.addEventListener('click', () => {
      //if (document.querySelectorAll('.video-slide.block').length != 1) {
      
      if (confirm("После удаления слайда данные не сохранятся. Удалить?")) {
        const targetVideoSlide = btn.parentNode.parentNode.parentNode.parentNode;
        targetVideoSlide.remove();
        let i = 1;
        let allSlides = document.querySelectorAll('.video-slide.block');
        document.querySelectorAll('.video-slide__number').forEach((item) => {
          allSlides[i - 1].className = `video-slide block added-${i}`;
          allSlides[i - 1].querySelector('.video-slide__change').setAttribute('name', `slide-${i}`)
          item.textContent = i++;
        })
        //slideNumber = +document.querySelectorAll('.video-slide__number').length - 1;
        let mainCounterVal = document.querySelector(".main-counter input").value;
        

        if (mainCounterVal / (i - 1) <= 5) {
          document.querySelector('.add-item-block.add-slide button').disabled = true;
          document.querySelector('.main-counter .minus').classList.add('disabled');
        } else {
          document.querySelector('.add-item-block.add-slide button').disabled = false;
          document.querySelector('.main-counter .minus').classList.remove('disabled');
        }
        if (document.querySelectorAll('.video-slide').length == 1) {
          document.querySelector('.btn-remove-slide').disabled = true;
        } else {
          document.querySelector('.btn-remove-slide').disabled = false;
        }

        let logoCheck = document.querySelectorAll('.form-check.for-logo');
        
        logoCheck.forEach(el => {
          
          let numb = el.parentElement.parentElement.querySelector('.video-slide__number').textContent;
          el.querySelector('[name="logo-use"]').id = "gridCheck-" + numb;
          el.querySelector('.for-logo label').setAttribute("for", "gridCheck-" + numb)
        });
      }
    });
  };

  //Функция иницинализации карусели
  function initCarousel(carouselClass) {
    $(carouselClass).slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      slidesToScroll: 2,
      infinity: true,
      responsive: [{
        breakpoint: 990,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      }, {
        breakpoint: 580,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      }, {
        breakpoint: 420,
        settings: {
          //arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }]
    });
  };

  //Функция для определения максимальной длины текста
  function getMaxLengthStimulPhrase(slideCounterInput) {
    return +slideCounterInput.value * validatonLevel;
  };

  //Функция валидации длины текста
  function validationText (element = insideSlideWrapp.querySelector('.text-zone .text-field'),
                      elementCounter = insideSlideWrapp.querySelector('.slide-counter input')
    ){
      let invalFeedback = document.createElement('div');
      invalFeedback.classList.add('invalid-feedback');
      
      element.after(invalFeedback);
      element.addEventListener('input', (e) => {
        let maxLengthStimulPhrase = getMaxLengthStimulPhrase(elementCounter);
        if (e.target.value.length > maxLengthStimulPhrase) {
          e.target.classList.add('is-invalid');
          invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
        } else {
          e.target.classList.remove('is-invalid');
          invalFeedback.textContent = '';
        }
      });
  };

  // --- Добавление самого первого слайда --- //
  document.querySelectorAll('.video-slide__change').forEach((item) => {
    let insideSlideWrapp, secondPart, optionalField;
    //первый салйд - побуждающая фраза
    switch (item.value) {
      case 'stimul':
        
        insideSlideWrapp = item.parentNode.parentNode.parentNode;

        createSecondPart(insideSlideWrapp, secondPart, 'stimul-part', setStimulHtmlWithSlider("stimul-part_slider"));
        //добавлям Touchstart на Counter этого слайда
        counterTouch("video-slide");

        //соло формы
        insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
          turnForm(item);
        })

        //запускаем counter длины 1го слайда
        changeValCountSlides(document.querySelector('.slide-counter'), 8, 2, 1);

        // валидация длины текста
        let invalFeedback = document.createElement('div');
        invalFeedback.classList.add('invalid-feedback');
        document.querySelector('.text-zone .text-field').after(invalFeedback);

        document.querySelector('.text-zone .text-field').addEventListener('input', (e) => {
          let maxLengthStimulPhrase = getMaxLengthStimulPhrase(document.querySelector('.slide-counter input'));
          if (e.target.value.length > maxLengthStimulPhrase) {
            e.target.classList.add('is-invalid');
            invalFeedback.textContent = `Длина текста ${e.target.value.length} при максимально допустимой в ${maxLengthStimulPhrase}`;
          } else {
            e.target.classList.remove('is-invalid');
            invalFeedback.textContent = '';
          }
        });
        break;
    };
      //иницианализируем карусель
    initCarousel('.stimul-part_slider');
    //инициализируем видео в слайде
    initSlideVideo(insideSlideWrapp);
    //иницинализируем функцию удаления слайда - идет после того как сформировалась
    deleteSlide(document.querySelector('.btn-remove-slide'));
  });

  //Функция плавного появления слайда
  function smoothAppearance (constructSlide){
    let startOpacity = 0.3,
      finishOpacity = 0.99,
      stepOp = 0.02;
    function step() {
      startOpacity = startOpacity + stepOp;
      constructSlide.style.opacity = `${startOpacity}`;
      if (startOpacity < finishOpacity) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  // --- Создание нового слайда по клику --- //
  let iArr = 1; //для обхода массива названий слайдов

  document.querySelector(".add-slide .add-item").addEventListener("click", () => {
    let slidesArr = ['stimul', 'logo', 'product', 'service', 'stock', 'contact'];

    let namePart = slidesArr[iArr];
    iArr++;
    if (iArr == slidesArr.length) {
      iArr = 0;
    }

    let allSlidesNumb = document.querySelectorAll('.video-slide__number');
    
    let slideNumber = +allSlidesNumb[allSlidesNumb.length - 1].textContent + 1;

    let constructSlide = document.createElement("div");
    constructSlide.className = `video-slide block added-${slideNumber}`
    constructSlide.innerHTML = setSlideHtmlWithSelector(slideNumber, namePart);
    let main = document.querySelector('.add-slide');
    main.before(constructSlide);

    let insideSlideWrapp, secondPart;
    insideSlideWrapp = document.querySelector(`.added-${slideNumber} .wrapper`);

    namePart = namePart + '-part';
    let number = (+document.querySelectorAll(`.${namePart}`).length + 1);
    
    let nameCarousel;
    if (number > 1) {
      nameCarousel = namePart + '_slider-' + number;
    } else {
      nameCarousel = namePart + '_slider';
      
    };
    createSecondPart(insideSlideWrapp, secondPart, namePart, createSecondPartHtml(nameCarousel));
    

    //меняем цвет counter при клике на него на Сенсорных
    counterTouch("", constructSlide);

    // если лого добавляем работу доп. форм(Нужно для: побуждающей, лого)
    if (namePart === 'logo-part') {
      let optionalField = document.querySelectorAll(".logo-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (namePart != 'stimul-part' && namePart != 'logo-part') {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (namePart === 'contact-part' || namePart === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = namePart + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', namePart + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', namePart + "_attach-" + number);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // валидация длины текста в полях слайда
    if (namePart === 'stimul-part' || namePart === 'stock-part') {
      validationText(insideSlideWrapp.querySelector('.text-zone .text-field'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'logo-part' || namePart === 'contact-part') {
      validationText(insideSlideWrapp.querySelector('.solo-check .optional-txt'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'product-part' || namePart === 'service-part') {
      validationText(insideSlideWrapp.querySelector('.product-block .description'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }

    // если товар-цена , услуга - добавить товар на страницу
    if (namePart === 'service-part' || namePart === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameCarousel);
      if (document.querySelectorAll(`.${namePart}`).length > 1) {
        let nameSliderSlim = nameCarousel.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //удаление товара
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length >= 2) {
          
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        };
      })
    };

    //иницинализируем карусель
    initCarousel(`.${nameCarousel}`);
    //Иницинализируем видео  
    initSlideVideo(insideSlideWrapp);

    //запускаем Counter длины слайда и присваиваем класс слайда  и меняем Name
    const slideCounter = insideSlideWrapp.querySelector('.slide-counter');
    slideCounter.querySelector('input').classList.add(namePart + '-count-' + number);
    slideCounter.querySelector('input').setAttribute('name', namePart + '-count-' + number);
    changeValCountSlides(slideCounter, 8, 2, 1);

    changeSlide(insideSlideWrapp.querySelector('.video-slide__change'));

    let mainCounterVal = document.querySelector(".main-counter input").value;
    if (mainCounterVal / slideNumber <= 5) {
      document.querySelector('.add-item-block.add-slide button').disabled = true;
      document.querySelector('.main-counter .minus').classList.add('disabled');
    } else {
      document.querySelector('.add-item-block.add-slide button').disabled = false;
      document.querySelector('.main-counter .minus').classList.remove('disabled');
    }

    //иницинализируем удаление слайда
    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));

    //перемещаем кнопку добавить слайд
    document.querySelector('.last-main-block').before(document.querySelector(".add-slide"));

    // Перемотка к началу созданого элемента и анимация
    insideSlideWrapp.scrollIntoView();
    smoothAppearance(constructSlide);
  });

  // --- Функция смены слайда через переключатель --- //
  function eventChangeSlide(elem) {
    const firstPart = elem.parentElement.parentElement;
    firstPart.nextElementSibling.remove();
    let secondPart, classForSecondP;
    switch (elem.value) {
      case "logo":
        classForSecondP = "logo-part";
        break;
      case "stimul":
        classForSecondP = "stimul-part";
        break;
      case "product":
        classForSecondP = "product-part";
        break;
      case "service":
        classForSecondP = "service-part";
        break;
      case "stock":
        classForSecondP = "stock-part";
        break;
      case "contact":
        classForSecondP = "contact-part";
        break;
    };

    let namePart = classForSecondP,
      constructSlide = firstPart.parentElement.parentElement,
      insideSlideWrapp = firstPart.parentNode,
      number = (+document.querySelectorAll(`.${classForSecondP}`).length + 1),
      nameSlider = classForSecondP + "_slider-" + number;

    createSecondPart(firstPart.parentElement, secondPart, classForSecondP, createSecondPartHtml(nameSlider));

    let slideNumber = +constructSlide.querySelector('.video-slide__number').textContent;
    //добавляем работу доп. форм(Нужно для: побуждающей)
    if (classForSecondP === 'stimul-part') {
      let optionalField = constructSlide.querySelectorAll(".stimul-part .optional-field");
      optionalField.forEach(function (item) {
        createOptionalFiled(item);
      });
    }
    // устанавливаем id для вложений
    if (classForSecondP != 'stimul-part' && classForSecondP != 'logo-part' ) {
      uploadFile(insideSlideWrapp.querySelector('.attach-block input'));
    }
    if (classForSecondP === 'contact-part' || classForSecondP === 'stock-part') {
      insideSlideWrapp.querySelector('.attach-block.for-logo input').id = classForSecondP + "_attach-" + number;
      insideSlideWrapp.querySelector('.attach-block.for-logo label').setAttribute('for', classForSecondP + "_attach-" + number);
      insideSlideWrapp.querySelector('.attach-block.for-logo input').setAttribute('name', classForSecondP + "_attach-" + number);
    }

    //добавляем работу дизэйбл энэйбл для Соло форм
    insideSlideWrapp.querySelectorAll(".solo-check").forEach(function (item) {
      turnForm(item);
    })

    // если товар-цена , услуга - добавить товар на страницу
    if (classForSecondP === 'service-part' || classForSecondP === 'product-part') { //<--------- ДЛЯ ТОВАР-ЦЕНА и УСЛУГА ЦЕНА
      addProduct(insideSlideWrapp, nameSlider);

      if (document.querySelectorAll(`.${classForSecondP}`).length > 1) {
        let nameSliderSlim = nameSlider.replace(/part_/g, "");
        insideSlideWrapp.querySelector('input[type="file"]').id = nameSliderSlim + '_img-1';
        insideSlideWrapp.querySelector('input[type="file"]').setAttribute("name", nameSliderSlim + '_img-1');
        insideSlideWrapp.querySelector('.my-file-input').setAttribute("for", nameSliderSlim + '_img-1');
      }

      //удаление товара
      insideSlideWrapp.querySelector(".close").addEventListener('click', () => {
        if (insideSlideWrapp.querySelectorAll('.product-block').length >= 2) {
          
          insideSlideWrapp.querySelector(".close").parentElement.parentElement;
          insideSlideWrapp.querySelector('.product-block').remove();
        };
      });
    };

    //переименовываем counter слайда и меняем Name
    insideSlideWrapp.querySelector('.slide-counter input').className = 'count ' + classForSecondP + '-count-' + number;
    insideSlideWrapp.querySelector('.slide-counter input').setAttribute('name', classForSecondP + '-count-' + number);

    //валидация длины формы
    if (namePart === 'stimul-part' || namePart === 'stock-part') {
      validationText(insideSlideWrapp.querySelector('.text-zone .text-field'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'logo-part' || namePart === 'contact-part') {
      validationText(insideSlideWrapp.querySelector('.solo-check .optional-txt'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }
    if (namePart === 'product-part' || namePart === 'service-part') {
      validationText(insideSlideWrapp.querySelector('.product-block .description'),
                    insideSlideWrapp.querySelector('.slide-counter input'))
    }

    //иницинализируем слайдер
    initCarousel(`.${nameSlider}`);

    //Иницинализируем видео  
    initSlideVideo(insideSlideWrapp);

    deleteSlide(insideSlideWrapp.querySelector(".btn-remove-slide"));

    smoothAppearance(constructSlide);
  }

  function changeSlide(elem) {
    elem.addEventListener('change', ()=>{
      eventChangeSlide(elem);
    });
  };

  //Иницианализируем функцию смены слайда с помощью переключателя
  changeSlide(document.querySelector('.video-slide__change'));

  
  // --- Функции анимации --- //
  function toggleClassActive(e) {
    e.classList.toggle('active-anim');
  }
  function addClassOk(e) {
      e.classList.add('finished-anim');
      setTimeout(() => {e.classList.remove('finished-anim');
      e.classList.remove('active-anim');
  }, 4000);
  }
  function addClassFail(e) {
    e.classList.remove('active-anim');
    e.classList.add('fail-anim');
    setTimeout( () => e.classList.remove('fail-anim'), 2000);
  }

  // --- Сборка и отправка формы --- //
  let formElem = document.querySelector('#formElem');

  //Функция сборки и отправки формы
  function submitHandler(e) {
    
    //убираем disabled у Counter
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.removeAttribute("disabled");
    });

    //формируем formData
    let formData = new FormData(formElem);
  /*   for (let [name, value] of formData) {
      
    } */
    //добавляем в formData name Animation
    document.querySelectorAll('.slick-slider').forEach((el) => {
      let parentNameAnimation = el.classList[0];
      let srcSlider = el.querySelector('.slick-current img').getAttribute('src');
      let nameAnimation = srcSlider.replace(/img\//gi, "");
      formData.append(parentNameAnimation, nameAnimation);
    });

 /*    for (let [name1, value1] of formData) {
      
    }; */
    //возвращаем инпут обратно
    document.querySelectorAll(".qty .count").forEach((el) => {
      el.setAttribute("disabled", "true");
    });
    
    document.querySelector('.modal .modal-body').textContent = "Отправляем данные... Не закрывайте окно до окончания отправки.";
   
    toggleClassActive(e);
    fetch("php/send.php", {
        method: "POST",
        body: formData
      })
      .then(response => {
        return response.json()
      })
      .then(function (json) {
        
        addClassOk(e)

        document.querySelector('.modal .modal-body').textContent = "Отправлено!"
        $(".modal").modal('show');
        //$("#myModalBox").modal('show');
        /*process your JSON further */
      })
      .catch(function (error) {
        addClassFail(e)
        
        document.querySelector('.modal .modal-body').textContent = "Отправка не удалась , попробуйте еще раз.";
        $(".modal").modal('show');
      });
  };

  //Отправка формы
  formElem.addEventListener('submit',(e)=>{
    e.preventDefault();
    e = e.target;
    e = e.querySelector('button[type="submit"]');
    let allDuration = document.querySelector('#main-conter-val').value;
    let slidesDurationArr=[],
        slidesDuration = 0;
    document.querySelectorAll('.slide-counter input').forEach((el)=>{
      slidesDurationArr.push(el.value);
    });

    slidesDurationArr.forEach(element => {
      slidesDuration += (+element);
    });

    if (allDuration >= slidesDuration){
      if (document.querySelector('.duration-message')){
        document.querySelector('.duration-message').remove();
      }
      submitHandler(e);
    } else {
      if (document.querySelector('.duration-message')){
        document.querySelector('.duration-message').remove();
        let durationMessage = document.createElement('div');
        durationMessage.classList.add('duration-message');
        durationMessage.textContent = "Сначала уменьшите длительность слайдов"
        document.querySelector('button[type="submit"]').before(durationMessage);
      } else {
        let durationMessage = document.createElement('div');
        durationMessage.classList.add('duration-message');
        durationMessage.textContent = "Сначала уменьшите длительность слайдов"
        document.querySelector('button[type="submit"]').before(durationMessage);
      };
    } 
  });

   // --- Header menu--- //
 document.querySelectorAll(".nav-item .nav-link.first span").forEach((item)=>{
  item.addEventListener("mouseover", ()=>{
    item.parentElement.classList.add("is-current", "active");
  });
  item.addEventListener("mouseout", ()=>{
    item.parentElement.classList.remove("is-current", "active");
  });
})





  // --------------

  /* var myVideos = document.querySelectorAll(".video1");

  console.log(myVideos.length);

  function playingVideo(data, video) {
    if (data.play) {
      video.currentTime = 0;
      video.play();
      console.log("включили видео");
    } else {
      video.currentTime = 0;
      console.log("ВЫключили видео");
      console.log(video);
      video.pause();

      if (video.played) {
        video.pause();
      }
    }
  }

  myVideos.forEach(function (myVideo) {
    var myVideoWrap = myVideo.parentElement;
    var props = {
      find: false,
      play: false
    };
    var observer = new MutationObserver(function (mutations) {
      console.log("check"); //mutation.target.classList.indexOf( 'slick-current' ) != -1

      mutations[0].target.classList.forEach(function (item) {
        if (item === "slick-current") {
          console.log(item);
          props.find = true;
        }
      });

      if (props.find) {
        props.play = true;
        props.find = false;
      } else {
        props.play = false;
      }

      playingVideo(props, myVideo);
    }); 
    
    // настраиваем наблюдатель

    var config = {
      attributes: true,
      childList: false,
      characterData: false
    }; 
    
    // передаем элемент и настройки в наблюдатель
    observer.observe(myVideoWrap, config);
  }); */

})